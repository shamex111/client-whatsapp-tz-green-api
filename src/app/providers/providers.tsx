import { ViewerProvider } from "@/entities/viewer/model/context/provider";
import { routes } from "@/pages/routes/routes";
import { queryClient } from "@/shared/api/queryClient";
import { store } from "@/shared/store/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";

const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ViewerProvider>
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </ViewerProvider>
    </QueryClientProvider>
  );
};

export default Providers;
