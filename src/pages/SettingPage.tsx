import { Link, Outlet, useLocation } from "react-router-dom";

export const description =
  "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings.";

export default function Dashboard() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.includes(path);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link
              to="general"
              className={`hover:font-semibold hover:text-primary ${
                isActive("general") ? "font-semibold text-primary" : ""
              }`}
            >
              General
            </Link>
            <Link
              to="manage-groups"
              className={`hover:font-semibold hover:text-primary ${
                isActive("manage-groups") ? "font-semibold text-primary" : ""
              }`}
            >
              Manage Groups
            </Link>
          </nav>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
