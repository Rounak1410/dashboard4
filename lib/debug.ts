// Debug utility for Firestore operations
export const logFirestoreOperation = (operation: string, data: any, error?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.group(`🔥 Firestore ${operation}`)
    console.log("Data:", data)
    if (error) {
      console.error("Error:", error)
    }
    console.groupEnd()
  }
}
