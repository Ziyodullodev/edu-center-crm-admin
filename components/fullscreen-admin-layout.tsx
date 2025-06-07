"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Users,
  GraduationCap,
  UsersRound,
  CreditCard,
  BookOpen,
  FileText,
  Calendar,
  UserCheck,
  MessageSquare,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  LogOut,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { languageNames } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface FullScreenAdminLayoutProps {
  children: React.ReactNode
  title?: string
}

export function FullScreenAdminLayout({ children, title = "Dashboard" }: FullScreenAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const navigation = [
    { name: t("dashboard"), href: "/", icon: Home, section: "Overview" },
    { name: t("students"), href: "/students", icon: GraduationCap, section: "Management" },
    { name: t("teachers"), href: "/teachers", icon: UserCheck, section: "Management" },
    { name: t("groups"), href: "/groups", icon: UsersRound, section: "Management" },
    { name: t("payments"), href: "/payments", icon: CreditCard, section: "Management" },
    { name: t("materials"), href: "/materials", icon: BookOpen, section: "Academic" },
    { name: t("exams"), href: "/exams", icon: FileText, section: "Academic" },
    { name: t("events"), href: "/events", icon: Calendar, section: "Academic" },
    { name: t("parents"), href: "/parents", icon: Users, section: "Communication" },
    { name: t("support"), href: "/support", icon: MessageSquare, section: "Communication" },
    { name: t("settings"), href: "/settings", icon: Settings, section: "System" },
  ]

  const groupedNavigation = navigation.reduce(
    (acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = []
      }
      acc[item.section].push(item)
      return acc
    },
    {} as Record<string, typeof navigation>,
  )

  const handleLogout = () => {
    router.push("/login")
  }

  const NavSection = ({ title, items }: { title: string; items: typeof navigation }) => (
    <div className="mb-6">
      <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-400"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 group-hover:text-gray-500"
                }`}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-72 flex-col bg-white dark:bg-gray-800 shadow-xl">
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">EC</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">EduCenter CRM</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto py-6 px-3">
            {Object.entries(groupedNavigation).map(([section, items]) => (
              <NavSection key={section} title={section} items={items} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">EC</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">EduCenter CRM</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-6 px-3">
            {Object.entries(groupedNavigation).map(([section, items]) => (
              <NavSection key={section} title={section} items={items} />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 shadow-sm">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo and Title - visible on mobile when sidebar is closed */}
          <div className="flex items-center lg:hidden">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">EC</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">EduCenter CRM</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full px-4 py-2">
  {/* Left side: Search */}
  <div className="relative flex items-center w-full max-w-md">
    <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 pl-3" />
    <Input
      className="block h-10 w-full border-gray-300 dark:border-gray-600 py-0 pl-10 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 rounded-lg"
      placeholder="Search students, teachers, groups..."
      type="search"
    />
  </div>

  {/* Right side: icons and profile */}
  <div className="flex items-center gap-x-3 ml-4">
    {/* Language Selector */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-2">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(languageNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as any)}
            className={language === code ? "bg-blue-50 dark:bg-blue-900/50" : ""}
          >
            {name}
            {language === code && <span className="ml-auto text-blue-600">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

    {/* Theme Toggle */}
    <Button
      variant="ghost"
      size="sm"
      className="p-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>

    {/* Notifications */}
    <Button variant="ghost" size="sm" className="relative p-2">
      <Bell className="h-5 w-5" />
      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white border-2 border-white dark:border-gray-800 flex items-center justify-center">
        3
      </Badge>
    </Button>

    {/* Profile */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 pl-2 pr-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-blue-600 text-white text-sm">AU</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block text-sm font-medium">Admin User</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>

        </div>

        {/* Page header */}

        {/* Main content */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          <div className="py-8">
            <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default FullScreenAdminLayout
