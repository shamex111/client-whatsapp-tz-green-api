import { authorization } from "@/entities/auth/libs/authService";
import tokenService from "@/entities/token/libs/tokenService";
import { ERouteNames } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { setCurrentContact } = useActions();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["authorization"],
    mutationFn: authorization,
    onSuccess: (data) => {
      if (data.stateInstance === "authorized") {
        setCurrentContact(data);
        setTimeout(() => {
          navigate(ERouteNames.DEFAULT_ROUTE);
        }, 1000);
      }
    },
  });

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const id = String(formData.get("id"));
    const token = String(formData.get("token"));

    if (id.trim().length && token.trim().length) {
      mutate({ idInstance: id, apiTokenInstance: token });
      tokenService.setAccessToken(token);
      tokenService.setAccessId(id);
      event.currentTarget.reset();
    }
  };

  return {
    onSubmitForm,
  };
};
