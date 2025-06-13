import { NavLink, type Link } from "./nav-link";

interface Props {
  links: Link[];
  currentPath: string;
}

export function DesktopNav({ links, currentPath }: Props) {
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-4 lg:gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <NavLink link={link} active={currentPath.includes(link.href)} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
