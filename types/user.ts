export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

export interface CreateUserData {
  name: string
  email: string
  phone?: string
  address?: string
  status: "active" | "inactive"
}
