import { getNavLinks } from "../data/navLinks"
export default function Navigation() { 
  return (
    <nav>
      <ul>
        {getNavLinks()}
      </ul>
    </nav>
  )
}