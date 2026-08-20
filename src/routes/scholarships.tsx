import { createFileRoute, Outlet } from "@tanstack/react-router";

/** Layout only — /scholarships listing lives in scholarships.index.tsx. */
export const Route = createFileRoute("/scholarships")({
  component: () => <Outlet />,
});
