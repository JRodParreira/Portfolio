import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Faz o scroll para o topo (x: 0, y: 0) sempre que o caminho mudar
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}