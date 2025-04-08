import { Route } from "react-router";
import AuthorsList from "../pages/AuthorsList";
import AuthorView from "../pages/AuthorView";

export interface AppRoutesI {
  mainRoute: boolean;
  path: string;
  component: React.ReactElement;
}

const AppRoutes:AppRoutesI[] = [{
  mainRoute: true,
  path: "/",
  component: <AuthorsList/>,
},{
  mainRoute: false,
  path: "/author/:id/view",
  component: <AuthorView/>,
}];

export const getRoutes = () =>
  AppRoutes.map((appRoute) =>
    appRoute.mainRoute ? (
      <Route key={appRoute.path} index element={appRoute.component} />
    ) : (
      <Route key={appRoute.path} path={appRoute.path} element={appRoute.component} />
    )
  );