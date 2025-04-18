import { NavLink } from "react-router";

export interface NavLinkI {
  name: string;
  url: string;
}

const navLinks: NavLinkI[] = [
  {
    name: "Authors",
    url: "/",
  },
  {
    name: "Books",
    url: "/books",
  },
  {
    name: "Add Book",
    url: "/books/create",
  },
];

export const getNavLinks = () =>
  navLinks.map((navLink) => (
    <li key={navLink.url}>
      <NavLink
        className={({ isActive }) => (isActive ? "active" : "")}
        to={navLink.url}
      >
        {navLink.name}
      </NavLink>
    </li>
  ));