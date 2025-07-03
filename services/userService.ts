import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { User, CreateUserData } from "@/types/user"

// Import the debug utility
import { logFirestoreOperation } from "@/lib/debug"

const USERS_COLLECTION = "users"

class UserService {
  // Update the getUsers method with better error handling
  async getUsers(): Promise<User[]> {
    try {
      logFirestoreOperation("getUsers", "Fetching all users")

      const q = query(collection(db, USERS_COLLECTION), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)

      const users = querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        }
      }) as User[]

      logFirestoreOperation("getUsers", `Fetched ${users.length} users`)
      return users
    } catch (error) {
      logFirestoreOperation("getUsers", "Failed to fetch users", error)
      console.error("Error fetching users:", error)
      throw new Error("Failed to fetch users from Firestore")
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const docRef = doc(db, USERS_COLLECTION, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        } as User
      }

      return null
    } catch (error) {
      console.error("Error fetching user:", error)
      throw new Error("Failed to fetch user from Firestore")
    }
  }

  // Fix the createUser method to properly handle Firestore document creation
  async createUser(userData: CreateUserData): Promise<User> {
    try {
      // Add timestamp fields
      const userWithTimestamps = {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      // Add to Firestore
      const docRef = await addDoc(collection(db, USERS_COLLECTION), userWithTimestamps)

      // For immediate UI update, return a properly formatted user object
      return {
        id: docRef.id,
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as User
    } catch (error) {
      console.error("Error creating user:", error)
      throw new Error("Failed to create user in Firestore")
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      const docRef = doc(db, USERS_COLLECTION, id)

      // Remove id, createdAt from update data
      const { id: _, createdAt, ...updateData } = userData

      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
      })

      // Fetch updated document
      const updatedDoc = await getDoc(docRef)
      const data = updatedDoc.data()

      return {
        id: updatedDoc.id,
        ...data,
        createdAt: data?.createdAt?.toDate?.()?.toISOString() || createdAt,
        updatedAt: new Date().toISOString(),
      } as User
    } catch (error) {
      console.error("Error updating user:", error)
      throw new Error("Failed to update user in Firestore")
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, USERS_COLLECTION, id))
    } catch (error) {
      console.error("Error deleting user:", error)
      throw new Error("Failed to delete user from Firestore")
    }
  }

  async searchUsers(searchTerm: string): Promise<User[]> {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a basic implementation - consider using Algolia for advanced search
      const q = query(
        collection(db, USERS_COLLECTION),
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff"),
        limit(20),
      )

      const querySnapshot = await getDocs(q)

      return querySnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        }
      }) as User[]
    } catch (error) {
      console.error("Error searching users:", error)
      throw new Error("Failed to search users")
    }
  }
}

export const userService = new UserService()
