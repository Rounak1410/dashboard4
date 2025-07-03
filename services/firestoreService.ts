// Firestore service implementation
// Uncomment when ready to integrate with Firestore

/*
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
  orderBy
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { User, CreateUserData } from '@/types/user'

const USERS_COLLECTION = 'users'

class FirestoreUserService {
  async getUsers(): Promise<User[]> {
    try {
      const q = query(collection(db, USERS_COLLECTION), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate().toISOString()
      })) as User[]
    } catch (error) {
      console.error('Error fetching users:', error)
      throw new Error('Failed to fetch users')
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
          createdAt: data.createdAt?.toDate().toISOString(),
          updatedAt: data.updatedAt?.toDate().toISOString()
        } as User
      }
      
      return null
    } catch (error) {
      console.error('Error fetching user:', error)
      throw new Error('Failed to fetch user')
    }
  }

  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const docRef = await addDoc(collection(db, USERS_COLLECTION), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      
      const newDoc = await getDoc(docRef)
      const data = newDoc.data()
      
      return {
        id: docRef.id,
        ...data,
        createdAt: data?.createdAt?.toDate().toISOString(),
        updatedAt: data?.updatedAt?.toDate().toISOString()
      } as User
    } catch (error) {
      console.error('Error creating user:', error)
      throw new Error('Failed to create user')
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      const docRef = doc(db, USERS_COLLECTION, id)
      await updateDoc(docRef, {
        ...userData,
        updatedAt: serverTimestamp()
      })
      
      const updatedDoc = await getDoc(docRef)
      const data = updatedDoc.data()
      
      return {
        id: updatedDoc.id,
        ...data,
        createdAt: data?.createdAt?.toDate().toISOString(),
        updatedAt: data?.updatedAt?.toDate().toISOString()
      } as User
    } catch (error) {
      console.error('Error updating user:', error)
      throw new Error('Failed to update user')
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, USERS_COLLECTION, id))
    } catch (error) {
      console.error('Error deleting user:', error)
      throw new Error('Failed to delete user')
    }
  }
}

export const firestoreUserService = new FirestoreUserService()
*/
