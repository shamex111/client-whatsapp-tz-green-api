import tokenService from "@/entities/token/libs/tokenService";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useViewer } from "../../model/context/provider";
import { ERouteNames } from "@/shared";

export const privatePage = (children: React.ReactNode) => {
  return <PrivatePage>{children}</PrivatePage>;
};

const PrivatePage: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loginViewer } = useViewer();
  const pathname = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = tokenService.getAccessToken();
    if (token) {
      loginViewer(token);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      navigate(ERouteNames.REGISTER_ROUTE);
    }
  }, [pathname]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return isAuthenticated ? children : null;
};
