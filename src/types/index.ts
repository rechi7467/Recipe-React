// export interface User {
//   id: number
//   username: string
//   email: string
//   createdAt: string
// }

// export interface Ingredient {
//   id: number
//   name: string
//   quantity: number
//   unit: string
// }

// export interface Recipe {
//   id: number
//   title: string
//   ingredients: Ingredient[]
//   instructions: string
//   userId: number
//   preparationTime: number
//   createdAt: string
//   imageUrl?: string
//   isPublic?: boolean
// }

// export interface LoginDTO {
//   usernameOrEmail: string
//   password: string
// }

// export interface RegisterDTO {
//   username: string
//   email: string
//   password: string
// }

// export interface AuthResponse {
//   token: string
// }


export interface User {
  id: number
  username: string
  email: string
  createdAt: string
}

export interface Ingredient {
  id: number
  name: string
  quantity: number
  unit: string
  recipeId?: number // 🔥 הוסף את זה אם צריך
}

// 🔥 Recipe מעודכן לפי המודל בשרת
export interface Recipe {
  id: number
  title: string
  description?: string // 🔥 הוסף
  instructions: string
  preparationTime: number
  servings?: number // 🔥 הוסף
  userId: number
  createdAt: string

  // 🔥 שדות תמונה
  imageUrl?: string
  imagePath?: string

  // 🔥 שדות העלאת קבצים
  originalFileName?: string
  fileType?: string
  fileSize?: number
  extractedText?: string
  isProcessed?: boolean

  // 🔥 שדות ציבוריים
  isPublic?: boolean
  satisfactionRating?: number
  ratingCount?: number
  categoryId?: number

  // 🔥 טיפים
  tips?: string

  // 🔥 קשרים
  ingredients: Ingredient[]
  user?: User
  category?: Category
}

// 🔥 הוסף Category אם צריך
export interface Category {
  id: number
  name: string
  description?: string
  recipes?: Recipe[]
}

export interface LoginDTO {
  usernameOrEmail: string
  password: string
}

export interface RegisterDTO {
  username: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user?: User // 🔥 אולי תרצה גם את פרטי המשתמש
}

// 🔥 DTOs נוספים שעשויים להיות שימושיים
export interface CreateRecipeDTO {
  title: string
  description?: string
  instructions: string
  preparationTime: number
  servings?: number
  isPublic?: boolean
  tips?: string
  ingredients: Omit<Ingredient, "id" | "recipeId">[]
  categoryId?: number
}

export interface UpdateRecipeDTO extends Partial<CreateRecipeDTO> {
  id: number
}

// 🔥 עבור העלאת קבצים
export interface FileUploadResult {
  success: boolean
  fileName?: string
  filePath?: string
  fileUrl?: string
  fileSize?: number
  contentType?: string
  errorMessage?: string
}

// 🔥 עבור תגובות API
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}


export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
