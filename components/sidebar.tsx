"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Users, Mail, Calendar, BarChart2, Settings, LogOut, Plug } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { href: "/leads", icon: Search, label: "Find Leads" },
  { href: "/pipeline", icon: Users, label: "My Pipeline" },
  { href: "/outreach", icon: Mail, label: "Outreach" },
  { href: "/meetings", icon: Calendar, label: "Meetings" },
  { href: "/analytics", icon: BarChart2, label: "Analytics" },
  { href: "/integrations", icon: Plug, label: "Integrations" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name ?? "Your Name";
  const userEmail = session?.user?.email ?? "you@company.com";
  const userImage = session?.user?.image;
  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-5">
        <Image
          src="/logo.png"
          alt="leadRX10"
          width={32}
          height={32}
          className="rounded-lg shrink-0"
        />
        <span className="text-sm font-semibold tracking-tight">leadRX10</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-muted text-foreground border-l-2 border-indigo-600 pl-[10px]"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive ? "text-indigo-600" : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            {userImage && <AvatarImage src={userImage} alt={userName} />}
            <AvatarFallback className="bg-indigo-600 text-white text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
          <div className="flex items-center gap-1">
            <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Sign out"
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
