"use client"

import { useState, useEffect } from "react"
import type { User } from "@/types/user"
import { userService } from "@/services/userService"
import UserList from "./UserList"
import UserForm from "./UserForm"
import SearchBar from "./SearchBar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Activity, TrendingUp, Database, RefreshCw, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, statusFilter])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const fetchedUsers = await userService.getUsers()
      setUsers(fetchedUsers)
      toast({
        title: "Success",
        description: `Loaded ${fetchedUsers.length} users from Firestore`,
      })
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Failed to connect to Firestore. Please check your configuration.",
        variant: "destructive",
      })
      console.error("Firestore connection error:", error)
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await fetchUsers()
    setRefreshing(false)
  }

  const filterUsers = () => {
    let filtered = users

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter)
    }

    setFilteredUsers(filtered)
  }

  const handleCreateUser = async (userData: Omit<User, "id" | "createdAt" | "updatedAt">) => {
    try {
      setLoading(true)
      const newUser = await userService.createUser(userData)

      // Add the new user to the beginning of the list for immediate feedback
      setUsers((prev) => [newUser, ...prev])
      setShowForm(false)

      toast({
        title: "User Created",
        description: `${newUser.name} has been successfully added to Firestore`,
      })

      // Refresh the data to ensure we have the latest from Firestore
      setTimeout(() => {
        refreshData()
      }, 1000)
    } catch (error) {
      console.error("Error creating user:", error)
      toast({
        title: "Error",
        description: "Failed to create user in Firestore. Please check console for details.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUser = async (id: string, userData: Partial<User>) => {
    try {
      const updatedUser = await userService.updateUser(id, userData)
      setUsers((prev) => prev.map((user) => (user.id === id ? updatedUser : user)))
      setEditingUser(null)
      toast({
        title: "User Updated",
        description: `${updatedUser.name} has been successfully updated in Firestore`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user in Firestore",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      await userService.deleteUser(id)
      setUsers((prev) => prev.filter((user) => user.id !== id))
      toast({
        title: "User Deleted",
        description: "User has been successfully removed from Firestore",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user from Firestore",
        variant: "destructive",
      })
    }
  }

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((user) => user.status === "active").length,
    inactiveUsers: users.filter((user) => user.status === "inactive").length,
    recentUsers: users.filter((user) => {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return new Date(user.createdAt) > oneWeekAgo
    }).length,
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Total Users</CardTitle>
            <Users className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-blue-100 mt-1">{stats.totalUsers > 0 ? "Users in database" : "No users yet"}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Active Users</CardTitle>
            <Activity className="h-5 w-5 text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-green-100 mt-1">
              {stats.totalUsers > 0
                ? `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total`
                : "0% of total"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">New This Week</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.recentUsers}</div>
            <p className="text-xs text-purple-100 mt-1">Recently joined</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Firestore Status</CardTitle>
            <Database className="h-5 w-5 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold">Connected</span>
            </div>
            <p className="text-xs text-orange-100 mt-1">Real-time sync active</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Main Content */}
      <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">User Management</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Manage your users with real-time Firestore synchronization
              </CardDescription>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshData}
                disabled={refreshing}
                className="flex items-center space-x-2 bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </Button>

              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center space-x-2 shadow-lg"
              >
                <Plus className="h-4 w-4" />
                <span>Add User</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search users by name or email..." />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <div className="flex space-x-2">
                <Badge
                  variant={statusFilter === "all" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setStatusFilter("all")}
                >
                  All ({stats.totalUsers})
                </Badge>
                <Badge
                  variant={statusFilter === "active" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setStatusFilter("active")}
                >
                  Active ({stats.activeUsers})
                </Badge>
                <Badge
                  variant={statusFilter === "inactive" ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setStatusFilter("inactive")}
                >
                  Inactive ({stats.inactiveUsers})
                </Badge>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          {(searchTerm || statusFilter !== "all") && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Showing {filteredUsers.length} of {stats.totalUsers} users
                {searchTerm && ` matching "${searchTerm}"`}
                {statusFilter !== "all" && ` with status "${statusFilter}"`}
              </p>
            </div>
          )}

          {/* User List */}
          <UserList users={filteredUsers} loading={loading} onEdit={setEditingUser} onDelete={handleDeleteUser} />
        </CardContent>
      </Card>

      {/* User Form Modal */}
      {(showForm || editingUser) && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? (data) => handleUpdateUser(editingUser.id, data) : handleCreateUser}
          onCancel={() => {
            setShowForm(false)
            setEditingUser(null)
          }}
        />
      )}
    </div>
  )
}
