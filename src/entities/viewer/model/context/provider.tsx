import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { IViewerHandler, IViewerState } from "./types";
import tokenService from "@/entities/token/libs/tokenService";

const ViewerContext = createContext<IViewerState & IViewerHandler>({
  isAuthenticated: false,
  loginViewer: () => {},
  logoutViewer: () => {},
});

export const useViewer = () => {
  return useContext(ViewerContext);
};

export const ViewerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [viewer, setViewer] = useState<IViewerState>({
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = tokenService.getAccessToken();
    if (token) {
      setViewer({
        isAuthenticated: true,
        accessToken: token,
      });
    }
  }, []);

  const handleLoginViewer = (accessToken: string) => {
    setViewer({
      isAuthenticated: true,
      accessToken,
    });
    tokenService.setAccessToken(accessToken);
  };

  const handleLogoutViewer = () => {
    setViewer({
      isAuthenticated: false,
      accessToken: null,
    });
    tokenService.deleteAccessToken();
  };

  return (
    <ViewerContext.Provider
      value={{
        ...viewer,
        loginViewer: handleLoginViewer,
        logoutViewer: handleLogoutViewer,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
};
