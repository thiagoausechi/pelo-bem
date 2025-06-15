import { useEffect, useState } from "react";

export function useIsMobile(mobileBreakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    const onChange = () => setIsMobile(window.innerWidth < mobileBreakpoint);

    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < mobileBreakpoint);
    return () => mql.removeEventListener("change", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- não é necessário adicionar `mobileBreakpoint` aqui, pois o valor não muda após a inicialização
  }, []);

  return !!isMobile;
}
