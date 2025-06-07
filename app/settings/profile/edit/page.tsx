"use client"

import type React from "react"
import { useState } from "react"
import { FullScreenAdminLayout } from "@/components/fullscreen-admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, Upload, Save, AlertCircle, CheckCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export default function ProfileEditPage() {
  const [profile, setProfile] = useState({
    name: "Administrator",
    email: "admin@educenter.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=128&width=128",
    language: "uz",
    timezone: "Asia/Tashkent",
    notificationEmail: true,
    notificationSms: true,
    notificationApp: true,
    theme: "dark",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setProfile((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile update logic
    console.log("Profile updated:", profile)
  }

  return (
    <FullScreenAdminLayout>
      <div className="p-6 space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm">
          <a href="/settings" className="text-muted-foreground hover:text-foreground">
            Sozlamalar
          </a>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-foreground font-medium">Profil</span>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profilni tahrirlash</h1>
            <p className="text-muted-foreground mt-1">Profil ma'lumotlaringizni yangilang</p>
          </div>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} alt="Profile" />
                  <AvatarFallback>{profile.name[0]}</AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-sm border border-gray-200"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>{profile.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Ism</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon raqam</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="language">Til</Label>
                  <Select
                    value={profile.language}
                    onValueChange={(value) => setProfile((prev) => ({
                      ...prev,
                      language: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tilni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uz">O'zbek</SelectItem>
                      <SelectItem value="ru">Rus</SelectItem>
                      <SelectItem value="en">Ingliz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Vaqt zoni</Label>
                  <Select
                    value={profile.timezone}
                    onValueChange={(value) => setProfile((prev) => ({
                      ...prev,
                      timezone: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Vaqt zonini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Tashkent">Toshkent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Notifications */}
              <div className="space-y-2">
                <CardHeader>
                  <CardTitle>Xabarlar</CardTitle>
                  <CardDescription>
                    Xabarlar va o'zgartirishlarni qanday olishingizni tanlang
                  </CardDescription>
                </CardHeader>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notificationEmail"
                      checked={profile.notificationEmail}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("notificationEmail", checked)
                      }
                    />
                    <Label htmlFor="notificationEmail">Email orqali</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notificationSms"
                      checked={profile.notificationSms}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("notificationSms", checked)
                      }
                    />
                    <Label htmlFor="notificationSms">SMS orqali</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="notificationApp"
                      checked={profile.notificationApp}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("notificationApp", checked)
                      }
                    />
                    <Label htmlFor="notificationApp">Ilova orqali</Label>
                  </div>
                </div>
              </div>

              {/* Theme */}
              <div className="space-y-2">
                <CardHeader>
                  <CardTitle>Temalar</CardTitle>
                  <CardDescription>Korinishi va ranglar</CardDescription>
                </CardHeader>
                <div className="flex items-center space-x-2">
                  <Select
                    value={profile.theme}
                    onValueChange={(value) => setProfile((prev) => ({
                      ...prev,
                      theme: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Temani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Yorug'lik</SelectItem>
                      <SelectItem value="dark">Qorong'lik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Saqlash
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </FullScreenAdminLayout>
  )
}
