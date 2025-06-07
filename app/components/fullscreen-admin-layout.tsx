"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Users,
  GraduationCap,
  UserCheck,
  UsersRound,
  CreditCard,
  BookOpen,
  FileText,
  Calendar,
  MessageSquare,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  Home,
  Globe,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface FullScreenAdminLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export function FullScreenAdminLayout({ children, currentPage }: FullScreenAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const navigation = [
    { name: "Boshqaruv paneli", href: "/", icon: Home, section: "OVERVIEW" },
    { name: "O'quvchilar", href: "/students", icon: GraduationCap, section: "MANAGEMENT" },
    { name: "O'qituvchilar", href: "/teachers", icon: UserCheck, section: "MANAGEMENT" },
    { name: "Guruhlar", href: "/groups", icon: UsersRound, section: "MANAGEMENT" },
    { name: "To'lovlar", href: "/payments", icon: CreditCard, section: "MANAGEMENT" },
    { name: "O'quv materiallari", href: "/materials", icon: BookOpen, section: "ACADEMIC" },
    { name: "Imtihonlar va testlar", href: "/exams", icon: FileText, section: "ACADEMIC" },
    { name: "Tadbirlar va bildirishnomalar", href: "/events", icon: Calendar, section: "ACADEMIC" },
    { name: "Ota-onalar kirishi", href: "/parents", icon: Users, section: "COMMUNICATION" },
    { name: "Yordam so'rovlari", href: "/support", icon: MessageSquare, section: "COMMUNICATION" },
    { name: "Sozlamalar", href: "/settings", icon: Settings, section: "SYSTEM" },
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
      <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        {title}
      </h3>
      <nav className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-400"
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-80 flex-col bg-white dark:bg-gray-800 shadow-xl">
          <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">EduCenter CRM</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Admin Panel</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto py-6 px-4">
            {Object.entries(groupedNavigation).map(([section, items]) => (
              <NavSection key={section} title={section} items={items} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">EduCenter CRM</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Admin Panel</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-6 px-4">
            {Object.entries(groupedNavigation).map(([section, items]) => (
              <NavSection key={section} title={section} items={items} />
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-80 flex flex-col flex-1 min-h-screen">
        {/* Top navigation - Matching the reference image design */}
        <div className="sticky top-0 z-40 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          {/* Left section - Mobile menu + Search */}
          <div className="flex items-center gap-x-4 flex-1 px-6">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search bar - Matching the reference design */}
            <div className="relative flex items-center w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-gray-400" />
              <Input
                className="h-10 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="O'quvchilar, o'qituvchi"
                type="search"
              />
            </div>
          </div>

          {/* Right corner - Control buttons exactly as shown in reference */}
          <div className="flex items-center gap-x-3 px-6">
            {/* Language Selector 🌐 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => {}}>
                  <span className="mr-2">🇺🇸</span>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                  <span className="mr-2">🇺🇿</span>
                  O'zbekcha
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                  <span className="mr-2">🇷🇺</span>
                  Русский
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                  <span className="mr-2">🇺🇿</span>
                  Ўзбекча
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle ☀️ */}
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 text-gray-600 dark:text-gray-300 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Notifications 🔔 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative h-9 w-9 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 text-white border-2 border-white dark:border-gray-800 flex items-center justify-center font-medium">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bildirishnomalar</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <DropdownMenuItem className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Yangi o'quvchi qo'shildi</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Alisher Karimov 10-sinfga qo'shildi</p>
                        <p className="text-xs text-gray-400 mt-1">5 daqiqa oldin</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">To'lov qabul qilindi</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Malika Tosheva - 500,000 som</p>
                        <p className="text-xs text-gray-400 mt-1">15 daqiqa oldin</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Dars bekor qilindi</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Matematika darsi - 9-sinf</p>
                        <p className="text-xs text-gray-400 mt-1">1 soat oldin</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>
                <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700">
                    Barcha bildirishnomalarni ko'rish
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile 👤 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">AU</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-blue-600 text-white">AU</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">admin@educenter.uz</p>
                    </div>
                  </div>
                </div>
                <DropdownMenuItem className="p-3">
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3">
                  <Settings className="mr-2 h-4 w-4" />
                  Sozlamalar
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3">
                  <Bell className="mr-2 h-4 w-4" />
                  Bildirishnomalar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 p-3">
                  <LogOut className="mr-2 h-4 w-4" />
                  Chiqish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto">
        {children}
        </main>
      </div>
    </div>
  )
}

export default FullScreenAdminLayout
