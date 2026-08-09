import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import {
  Briefcase,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Link2,
  LogOut,
  Mail,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useTheme } from "@/lib/theme";
import { CrudManager } from "@/components/admin/crud-manager";
import { ProfileEditor } from "@/components/admin/profile-editor";
import { MessagesManager } from "@/components/admin/messages-manager";
import { DeveloperLogin } from "@/components/site/developer-login";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Dashboard | Mohamed Dah Agove" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Private dashboard." },
    ],
  }),
  component: AdminPage,
});

type SectionId =
  | "dashboard"
  | "profile"
  | "education"
  | "experience"
  | "skills"
  | "projects"
  | "social"
  | "messages"
  | "settings";

const NAV: { id: SectionId; label: string; Icon: typeof User }[] = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "profile", label: "Profile", Icon: User },
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "skills", label: "Skills", Icon: Wrench },
  { id: "projects", label: "Projects", Icon: FolderKanban },
  { id: "social", label: "Social Links", Icon: Link2 },
  { id: "messages", label: "Messages", Icon: Mail },
  { id: "settings", label: "Settings", Icon: Settings },
];

function AdminPage() {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);
  const [section, setSection] = useState<SectionId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!checked) {
    return (
      <div className="mx-auto max-w-3xl space-y-3 p-8">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!session) {
    return <LockedScreen />;
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-40 w-64 shrink-0 border-e border-sidebar-border bg-sidebar p-4 text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full lg:translate-x-0",
        )}
      >
        <div className="mb-6 flex items-center gap-2 px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground">
            MDA
          </span>
          <span className="font-display text-sm font-semibold">Admin</span>
        </div>
        <nav aria-label="Dashboard">
          <ul className="space-y-1">
            {NAV.map(({ id, label, Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => {
                    setSection(id);
                    setSidebarOpen(false);
                  }}
                  aria-current={section === id ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    section === id
                      ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={signOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 transition-colors hover:bg-destructive/20 hover:text-sidebar-foreground"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Toggle sidebar"
              onClick={() => setSidebarOpen((o) => !o)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground">{session.user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate({ to: "/" })}>
              View site
            </Button>
          </div>
        </header>

        <main className="p-4 sm:p-8">
          <AdminSection section={section} onNavigate={setSection} />
        </main>
      </div>
    </div>
  );
}

function LockedScreen() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-sm text-center">
        <h1 className="text-xl font-semibold">Restricted area</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You need to sign in to manage this portfolio.
        </p>
        <Button className="mt-6" onClick={() => setOpen(true)}>
          Sign in
        </Button>
      </div>
      <DeveloperLogin open={open} onOpenChange={setOpen} />
    </div>
  );
}

function AdminSection({
  section,
  onNavigate,
}: {
  section: SectionId;
  onNavigate: (s: SectionId) => void;
}) {
  switch (section) {
    case "profile":
      return <ProfileEditor />;
    case "education":
      return (
        <CrudManager
          table="education"
          title="Education"
          primaryField="institution"
          secondaryField="degree"
          fields={[
            { name: "institution", label: "Institution", required: true },
            { name: "degree", label: "Degree", required: true },
            { name: "field", label: "Field" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "start_year", label: "Start Year", type: "number" },
            { name: "end_year", label: "End Year", type: "number" },
            { name: "current", label: "Current", type: "bool" },
            { name: "location", label: "Location" },
            { name: "sort_order", label: "Sort Order", type: "number" },
          ]}
        />
      );
    case "experience":
      return (
        <CrudManager
          table="experience"
          title="Experience"
          primaryField="organization"
          secondaryField="position"
          fields={[
            { name: "organization", label: "Organization", required: true },
            { name: "position", label: "Position", required: true },
            { name: "department", label: "Department" },
            { name: "description", label: "Description", type: "textarea" },
            { name: "start_date", label: "Start Date", type: "date" },
            { name: "end_date", label: "End Date", type: "date" },
            { name: "current", label: "Current", type: "bool" },
            { name: "location", label: "Location" },
            { name: "sort_order", label: "Sort Order", type: "number" },
          ]}
        />
      );
    case "skills":
      return (
        <CrudManager
          table="skills"
          title="Skills"
          primaryField="name"
          secondaryField="category"
          fields={[
            { name: "name", label: "Name", required: true },
            {
              name: "category",
              label: "Category",
              required: true,
              placeholder: "Banking & Finance | Development | Database & Backend | Tools",
            },
            { name: "level", label: "Level (0-100)", type: "number" },
            { name: "icon", label: "Icon" },
            { name: "sort_order", label: "Sort Order", type: "number" },
          ]}
        />
      );
    case "projects":
      return (
        <CrudManager
          table="projects"
          title="Projects"
          primaryField="title"
          secondaryField="category"
          fields={[
            { name: "title", label: "Project Name", required: true },
            { name: "slug", label: "Slug", required: true },
            { name: "short_description", label: "Short Description" },
            { name: "full_description", label: "Full Description", type: "textarea" },
            {
              name: "category",
              label: "Category",
              placeholder: "Web Development | Education | Management | Finance | Student Projects",
            },
            { name: "technologies", label: "Technologies (comma separated)", type: "tags" },
            { name: "live_url", label: "Live Demo URL" },
            { name: "github_url", label: "GitHub URL" },
            { name: "image_url", label: "Project Image", type: "image" },
            { name: "featured", label: "Featured", type: "bool" },
            { name: "sort_order", label: "Sort Order", type: "number" },
          ]}
        />
      );
    case "social":
      return (
        <CrudManager
          table="social_links"
          title="Social Links"
          primaryField="platform"
          secondaryField="url"
          fields={[
            { name: "platform", label: "Platform", required: true },
            { name: "url", label: "URL", required: true },
            { name: "icon", label: "Icon" },
            { name: "enabled", label: "Enabled", type: "bool" },
            { name: "sort_order", label: "Sort Order", type: "number" },
          ]}
        />
      );
    case "messages":
      return <MessagesManager />;
    case "settings":
      return (
        <CrudManager
          table="site_settings"
          title="Site Settings"
          primaryField="site_title"
          secondaryField="site_description"
          orderBy="id"
          fields={[
            { name: "site_title", label: "Site Title", required: true },
            { name: "site_description", label: "Site Description", type: "textarea" },
            { name: "primary_color", label: "Primary Color" },
            { name: "accent_color", label: "Accent Color" },
            { name: "favicon_url", label: "Favicon URL" },
          ]}
        />
      );
    default:
      return <Overview onNavigate={onNavigate} />;
  }
}

function useCount(table: string) {
  return useQuery({
    queryKey: ["admin", "count", table],
    queryFn: async () => {
      const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });
}

function Overview({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  const projects = useCount("projects");
  const skills = useCount("skills");
  const experience = useCount("experience");
  const messages = useCount("messages");

  const latest = useQuery({
    queryKey: ["admin", "latest-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id,title,category")
        .order("sort_order", { ascending: true })
        .limit(5);
      if (error) throw error;
      return (data ?? []) as { id: string; title: string; category: string }[];
    },
  });

  const cards = [
    { label: "Projects", q: projects },
    { label: "Skills", q: skills },
    { label: "Experiences", q: experience },
    { label: "Messages", q: messages },
  ];

  return (
    <section>
      <h1 className="text-2xl font-semibold">Welcome back, Mohamed</h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage your portfolio content.</p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, q }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="mt-2 font-display text-3xl font-semibold">
              {q.isLoading ? <Skeleton className="h-8 w-12" /> : q.isError ? "—" : q.data}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Latest projects</h2>
          <Button variant="outline" size="sm" onClick={() => onNavigate("projects")}>
            Manage
          </Button>
        </div>
        {latest.isLoading ? (
          <Skeleton className="h-24 w-full" />
        ) : !latest.data || latest.data.length === 0 ? (
          <p className="text-sm text-muted-foreground">No projects yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {latest.data.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                <span>{p.title}</span>
                <span className="text-muted-foreground">{p.category}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
