import { authorization } from "@/entities/auth/libs/authService";
import { contactsSelectors } from "@/entities/contact/models/store/contactsSlice";
import tokenService from "@/entities/token/libs/tokenService";
import { ERouteNames } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRoot = () => {
  const { setAllAsyncMessages, setCurrentContact } = useActions();
  const navigate = useNavigate();

  const { data, isSuccess } = useQuery({
    queryKey: ["authorization"],
    queryFn: () => {
      const tokenId = tokenService.getAccessId() ?? "";
      const idInstance = tokenService.getAccessToken() ?? "";
      return authorization({
        apiTokenInstance: idInstance,
        idInstance: tokenId,
      });
    },
  });
  const currentContact = useAppSelector(contactsSelectors.currentContact);

  useEffect(() => {
    if (isSuccess && data) {
      if (data.stateInstance === "authorized") {
        setCurrentContact(data);
        setAllAsyncMessages();
      } else {
        console.log(data, isSuccess);
        navigate(ERouteNames.AUTH_ROUTE);
      }
    }
  }, [isSuccess, data]);

  return {
    currentContact,
  };
};
