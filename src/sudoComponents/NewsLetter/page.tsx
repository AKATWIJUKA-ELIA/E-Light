"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Save, Eye, Users, Mail, Calendar, FileText, Plus, X, Upload, BarChart3 } from "lucide-react"

interface Newsletter {
  id: string
  subject: string
  content: string
  recipients: string[]
  status: "draft" | "sent" | "scheduled"
  createdAt: Date
  sentAt?: Date
  openRate?: number
  clickRate?: number
}

interface EmailList {
  id: string
  name: string
  emails: string[]
  tags: string[]
}

export default function NewsletterAdmin() {
  const [activeTab, setActiveTab] = useState("compose")
  const [newsletter, setNewsletter] = useState({
    subject: "",
    content: "",
    recipients: [] as string[],
  })
  const [emailLists, setEmailLists] = useState<EmailList[]>([
    {
      id: "1",
      name: "All Subscribers",
      emails: ["user1@example.com", "user2@example.com", "user3@example.com"],
      tags: ["general"],
    },
    {
      id: "2",
      name: "Premium Users",
      emails: ["premium1@example.com", "premium2@example.com"],
      tags: ["premium", "paid"],
    },
  ])
  const [newsletters, setNewsletters] = useState<Newsletter[]>([
    {
      id: "1",
      subject: "Welcome to Our Platform!",
      content: "Thank you for joining us...",
      recipients: ["user1@example.com", "user2@example.com"],
      status: "sent",
      createdAt: new Date("2024-01-15"),
      sentAt: new Date("2024-01-15"),
      openRate: 85,
      clickRate: 12,
    },
    {
      id: "2",
      subject: "Monthly Update - January",
      content: "Here are the latest updates...",
      recipients: ["user1@example.com"],
      status: "draft",
      createdAt: new Date("2024-01-20"),
    },
  ])
  const [previewMode, setPreviewMode] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [selectedList, setSelectedList] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSaveDraft = () => {
    const newNewsletter: Newsletter = {
      id: Date.now().toString(),
      subject: newsletter.subject,
      content: newsletter.content,
      recipients: newsletter.recipients,
      status: "draft",
      createdAt: new Date(),
    }
    setNewsletters([newNewsletter, ...newsletters])
    // Show success message
    alert("Newsletter saved as draft!")
  }

  const handleSendNewsletter = () => {
    if (!newsletter.subject || !newsletter.content || newsletter.recipients.length === 0) {
      alert("Please fill in all fields and select recipients")
      return
    }

    const newNewsletter: Newsletter = {
      id: Date.now().toString(),
      subject: newsletter.subject,
      content: newsletter.content,
      recipients: newsletter.recipients,
      status: "sent",
      createdAt: new Date(),
      sentAt: new Date(),
    }
    setNewsletters([newNewsletter, ...newsletters])
    setNewsletter({ subject: "", content: "", recipients: [] })
    alert(`Newsletter sent to ${newsletter.recipients.length} recipients!`)
  }

  const addEmailToList = () => {
    if (newEmail && selectedList) {
      setEmailLists((lists) =>
        lists.map((list) => (list.id === selectedList ? { ...list, emails: [...list.emails, newEmail] } : list)),
      )
      setNewEmail("")
    }
  }

  const removeEmailFromRecipients = (email: string) => {
    setNewsletter((prev) => ({
      ...prev,
      recipients: prev.recipients.filter((r) => r !== email),
    }))
  }

  const addListToRecipients = (listId: string) => {
    const list = emailLists.find((l) => l.id === listId)
    if (list) {
      setNewsletter((prev) => ({
        ...prev,
        recipients: [...new Set([...prev.recipients, ...list.emails])],
      }))
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "text/csv") {
      // Simulate CSV parsing
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        const emails = text
          .split("\n")
          .map((line) => line.trim())
          .filter((email) => email.includes("@"))
        if (selectedList) {
          setEmailLists((lists) =>
            lists.map((list) =>
              list.id === selectedList ? { ...list, emails: [...new Set([...list.emails, ...emails])] } : list,
            ),
          )
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen mt-20 bg-gray-50 dark:bg-dark p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Newsletter Admin</h1>
          <p className="text-gray-600 mt-2">Create, manage, and send newsletters to your subscribers</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="compose" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Compose
            </TabsTrigger>
            <TabsTrigger value="recipients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Recipients
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="dark:bg-dark" >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Newsletter Composer
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
                          <Eye className="h-4 w-4 mr-2" />
                          {previewMode ? "Edit" : "Preview"}
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!previewMode ? (
                      <>
                        <div>
                          <Label htmlFor="subject">Subject Line</Label>
                          <Input
                            id="subject"
                            placeholder="Enter newsletter subject..."
                            value={newsletter.subject}
                            onChange={(e) => setNewsletter((prev) => ({ ...prev, subject: e.target.value }))}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            placeholder="Write your newsletter content here..."
                            value={newsletter.content}
                            onChange={(e) => setNewsletter((prev) => ({ ...prev, content: e.target.value }))}
                            className="mt-1 min-h-[400px]"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="border rounded-lg p-6 bg-white">
                        <div className="mb-4 pb-4 border-b">
                          <h2 className="text-xl font-semibold">{newsletter.subject || "Newsletter Subject"}</h2>
                          <p className="text-sm text-gray-500">Preview Mode</p>
                        </div>
                        <div className="prose max-w-none">
                          <div className="whitespace-pre-wrap">
                            {newsletter.content || "Newsletter content will appear here..."}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="dark:bg-dark" >
                  <CardHeader>
                    <CardTitle className="text-lg">Recipients</CardTitle>
                    <CardDescription>{newsletter.recipients.length} recipients selected</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Email Lists</Label>
                        <div className="mt-2 space-y-2">
                          {emailLists.map((list) => (
                            <div key={list.id} className="flex items-center justify-between p-2 border rounded">
                              <div>
                                <p className="font-medium text-sm">{list.name}</p>
                                <p className="text-xs text-gray-500">{list.emails.length} emails</p>
                              </div>
                              <Button size="sm" variant="outline" onClick={() => addListToRecipients(list.id)}>
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-sm font-medium">Selected Recipients</Label>
                        <ScrollArea className="h-32 mt-2">
                          <div className="space-y-1">
                            {newsletter.recipients.map((email, index) => (
                              <div key={index} className="flex items-center justify-between p-1">
                                <span className="text-sm">{email}</span>
                                <Button size="sm" variant="ghost" onClick={() => removeEmailFromRecipients(email)}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={handleSendNewsletter}
                      className="w-full"
                      disabled={!newsletter.subject || !newsletter.content || newsletter.recipients.length === 0}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Newsletter
                    </Button>
                    <Button variant="outline" onClick={handleSaveDraft} className="w-full bg-transparent">
                      <Save className="h-4 w-4 mr-2" />
                      Save as Draft
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recipients" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="dark:bg-dark" >
                <CardHeader>
                  <CardTitle>Email Lists</CardTitle>
                  <CardDescription>Manage your subscriber lists</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emailLists.map((list) => (
                      <div key={list.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{list.name}</h3>
                          <Badge variant="secondary">{list.emails.length} emails</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {list.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          {list.emails.slice(0, 3).join(", ")}
                          {list.emails.length > 3 && ` +${list.emails.length - 3} more`}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-dark" >
                <CardHeader>
                  <CardTitle>Add Subscribers</CardTitle>
                  <CardDescription>Add new email addresses to your lists</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email-list">Select List</Label>
                    <select
                      id="email-list"
                      value={selectedList}
                      onChange={(e) => setSelectedList(e.target.value)}
                      className="w-full mt-1 p-2 border rounded-md"
                    >
                      <option value="">Choose a list...</option>
                      {emailLists.map((list) => (
                        <option key={list.id} value={list.id}>
                          {list.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="new-email">Email Address</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="new-email"
                        type="email"
                        placeholder="user@example.com"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                      <Button onClick={addEmailToList} disabled={!newEmail || !selectedList}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label>Import from CSV</Label>
                    <div className="mt-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={!selectedList}
                        className="w-full"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload CSV File
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="dark:bg-dark">
              <CardHeader>
                <CardTitle>Newsletter History</CardTitle>
                <CardDescription>View and manage your sent newsletters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsletters.map((newsletter) => (
                    <div key={newsletter.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{newsletter.subject}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={newsletter.status === "sent" ? "default" : "secondary"}>
                            {newsletter.status}
                          </Badge>
                          {newsletter.status === "sent" && (
                            <Badge variant="outline">
                              <Mail className="h-3 w-3 mr-1" />
                              {newsletter.recipients.length}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{newsletter.content.substring(0, 100)}...</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Created: {newsletter.createdAt.toLocaleDateString()}</span>
                        {newsletter.sentAt && <span>Sent: {newsletter.sentAt.toLocaleDateString()}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="dark:bg-dark" >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{newsletters.filter((n) => n.status === "sent").length}</div>
                  <p className="text-xs text-gray-500">newsletters sent</p>
                </CardContent>
              </Card>

              <Card className="dark:bg-dark"  >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {emailLists.reduce((acc, list) => acc + list.emails.length, 0)}
                  </div>
                  <p className="text-xs text-gray-500">active subscribers</p>
                </CardContent>
              </Card>

              <Card className="dark:bg-dark"  >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {newsletters.filter((n) => n.openRate).length > 0
                      ? Math.round(
                          newsletters.filter((n) => n.openRate).reduce((acc, n) => acc + (n.openRate || 0), 0) /
                            newsletters.filter((n) => n.openRate).length,
                        )
                      : 0}
                    %
                  </div>
                  <p className="text-xs text-gray-500">average open rate</p>
                </CardContent>
              </Card>
            </div>

            <Card className="dark:bg-dark" >
              <CardHeader>
                <CardTitle>Recent Performance</CardTitle>
                <CardDescription>Performance metrics for your recent newsletters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsletters
                    .filter((n) => n.status === "sent" && n.openRate)
                    .map((newsletter) => (
                      <div key={newsletter.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium text-sm">{newsletter.subject}</p>
                          <p className="text-xs text-gray-500">Sent to {newsletter.recipients.length} recipients</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{newsletter.openRate}% opened</p>
                          <p className="text-xs text-gray-500">{newsletter.clickRate}% clicked</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
