'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  Users,
  Mail,
  Calendar,
  BarChart2,
  Settings,
  Zap,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/leads', icon: Search, label: 'Find Leads' },
  { href: '/pipeline', icon: Users, label: 'My Pipeline' },
  { href: '/outreach', icon: Mail, label: 'Outreach' },
  { href: '/meetings', icon: Calendar, label: 'Meetings' },
  { href: '/analytics', icon: BarChart2, label: 'Analytics' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-border bg-sidebar">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-base font-semibold text-sidebar-foreground">
          LeadEngine
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === '/leads' && pathname === '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'border-l-2 border-primary bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-xs text-primary">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              John Doe
            </p>
            <p className="truncate text-xs text-muted-foreground">
              john@company.com
            </p>
          </div>
          <button
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
