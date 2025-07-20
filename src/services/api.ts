import axios from "axios"
import type { LoginDTO, RegisterDTO, AuthResponse, Recipe } from "../types"

const API_BASE_URL = "https://localhost:7080/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  login: (data: LoginDTO) => api.post<AuthResponse>("/auth/login", data),
  register: (data: RegisterDTO) => api.post<{ message: string }>("/auth/register", data),
}

export const recipeAPI = {
  getAll: () => api.get<Recipe[]>("/recipe"),
  getById: (id: number) => api.get<Recipe>(`/recipe/${id}`),
  getRandom: () => api.get<Recipe>("/recipe/random"),
  getPublic: () => api.get<Recipe[]>("/recipe/public"),
  getMyRecipes: () => api.get<Recipe[]>("/recipe/my"),
  create: (recipe: any) => api.post<Recipe>("/recipe", recipe),
  update: (id: number, recipe: any) => api.put<Recipe>(`/recipe/${id}`, recipe),
  delete: (id: number) => api.delete(`/recipe/${id}`),
}

export default api
