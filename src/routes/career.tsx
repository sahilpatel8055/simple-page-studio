import { createFileRoute, Outlet } from "@tanstack/react-router";

/** Layout only — /career listing lives in career.index.tsx. */
export const Route = createFileRoute("/career")({
  component: () => <Outlet />,
});
