import { cn } from "@client/lib/utils";
import NextLink from "next/link";

export interface Link {
  label: string;
  href: string;
}

interface Props extends Omit<React.ComponentProps<typeof NextLink>, "href"> {
  link: Link;
  active: boolean;
}

export function NavLink({ className, link, active, ...props }: Props) {
  const { href, label } = link;

  return (
    <NextLink
      href={href}
      className={cn(
        "text-muted-foreground hover:text-foreground relative text-xs font-medium transition-colors lg:text-sm",
        { "text-primary hover:text-secondary": active },
        className,
      )}
      {...props}
    >
      {label}
    </NextLink>
  );
}
