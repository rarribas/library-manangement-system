import { Route } from "react-router";
import AuthorsList from "../pages/AuthorsList";
import AuthorView from "../pages/AuthorView";
import BooksList from "../pages/BooksList";
import BookView from "../pages/BookView";

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
},{
  mainRoute: false,
  path: "/books",
  component: <BooksList/>,
},{
  mainRoute: false,
  path: "/books/:id/view",
  component: <BookView/>,
}];

export const getRoutes = () =>
  AppRoutes.map((appRoute) =>
    appRoute.mainRoute ? (
      <Route key={appRoute.path} index element={appRoute.component} />
    ) : (
      <Route key={appRoute.path} path={appRoute.path} element={appRoute.component} />
    )
  );