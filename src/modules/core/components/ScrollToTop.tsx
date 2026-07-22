import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export default function ScrollToTop() {
  const state = useRouterState();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [state.location.pathname]);

  return null;
}
