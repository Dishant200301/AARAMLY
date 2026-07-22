import { createFileRoute } from "@tanstack/react-router";
import AaramlyHome from "@/components/aaramly/AaramlyHome";

export const Route = createFileRoute("/")({
  component: AaramlyHome,
});
