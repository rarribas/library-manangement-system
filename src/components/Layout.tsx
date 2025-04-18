import { Outlet } from "react-router";
import Navigation from "./Navigation";

export default function Layout() { 
  return (
    <div className="layout">
      <aside>
        <Navigation />
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  )
}