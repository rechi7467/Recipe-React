"use client"
import type React from "react"
import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  FormControlLabel,
  Switch,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { recipeAPI } from "../services/api"
import type { Ingredient, Recipe } from "../types"

interface FormData {
  title: string
  instructions: string
  preparationTime: number
  isPublic: boolean
  ingredients: Ingredient[]
  description?: string
  servings?: number
  tips?: string
}

const CreateRecipePage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>() // 🔥 קבלת ID מה-URL
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [loadingRecipe, setLoadingRecipe] = useState(false) // 🔥 טעינת מתכון לעריכה
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState(false)
  const [isEditing, setIsEditing] = useState(false) // 🔥 האם זה עריכה או יצירה
  const [formData, setFormData] = useState<FormData>({
    title: "",
    instructions: "",
    preparationTime: 30,
    isPublic: true,
    ingredients: [{ id: 0, name: "", quantity: 1, unit: "יחידה" }],
    description: "",
    servings: 4,
    tips: "",
  })

  // 🔥 טעינת מתכון לעריכה
  useEffect(() => {
    if (id && isAuthenticated) {
      setIsEditing(true)
      loadRecipeForEdit(id)
    }
  }, [id, isAuthenticated])

  const loadRecipeForEdit = async (recipeId: string) => {
    try {
      setLoadingRecipe(true)
      const response = await recipeAPI.getById(Number(recipeId))
      const recipe: Recipe = response.data

      // 🔥 מילוי הטופס עם נתוני המתכון הקיים
      setFormData({
        title: recipe.title || "",
        instructions: recipe.instructions || "",
        preparationTime: recipe.preparationTime || 30,
        isPublic: recipe.isPublic || false,
        ingredients:
          recipe.ingredients && recipe.ingredients.length > 0
            ? recipe.ingredients
            : [{ id: 0, name: "", quantity: 1, unit: "יחידה" }],
        description: recipe.description || "",
        servings: recipe.servings || 4,
        tips: recipe.tips || "",
      })
    } catch (err: any) {
      console.error("Error loading recipe for edit:", err)
      setError("שגיאה בטעינת המתכון לעריכה")
      // אם יש שגיאה, חזור לדף המתכונים
      setTimeout(() => navigate("/my-recipes"), 2000)
    } finally {
      setLoadingRecipe(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="create-recipe-universe">
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <div className="auth-required-3d">
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
                color: "#ffffff",
                textAlign: "center",
                mb: 2,
              }}
            >
              🔐 נדרשת התחברות
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Rubik, sans-serif",
                color: "rgba(255, 255, 255, 0.8)",
                textAlign: "center",
                mb: 3,
              }}
            >
              עליך להתחבר כדי {isEditing ? "לערוך מתכון" : "ליצור מתכון חדש"}
            </Typography>
            <Box textAlign="center">
              <Button onClick={() => navigate("/login")} className="auth-button-3d">
                התחבר עכשיו
              </Button>
            </Box>
          </div>
        </Container>
      </div>
    )
  }

  // 🔥 אם טוען מתכון לעריכה
  if (loadingRecipe) {
    return (
      <div className="create-recipe-universe">
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <div className="loading-3d">
            <CircularProgress
              size={80}
              sx={{
                color: "#ff6b35",
                filter: "drop-shadow(0 0 15px #ff6b35)",
              }}
            />
            <Typography
              sx={{
                color: "#ffffff",
                fontFamily: "Rubik, sans-serif",
                fontWeight: 500,
                mt: 2,
              }}
            >
              טוען מתכון לעריכה...
            </Typography>
          </div>
        </Container>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
    const updatedIngredients = [...formData.ingredients]
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    }
    setFormData({ ...formData, ingredients: updatedIngredients })
  }

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { id: 0, name: "", quantity: 1, unit: "יחידה" }],
    })
  }

  const removeIngredient = (index: number) => {
    const updatedIngredients = formData.ingredients.filter((_, i) => i !== index)
    setFormData({ ...formData, ingredients: updatedIngredients })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!formData.title.trim()) {
        throw new Error("יש להזין כותרת למתכון")
      }
      if (!formData.instructions.trim()) {
        throw new Error("יש להזין הוראות הכנה")
      }
      if (formData.ingredients.some((ing) => !ing.name.trim())) {
        throw new Error("יש למלא את שמות כל המרכיבים")
      }

      let response

      // 🔥 בחירה בין עדכון ליצירה
      if (isEditing && id) {
        response = await recipeAPI.update(Number(id), formData)
        console.log("Recipe updated:", response.data)
        setSuccess(true)
        setTimeout(() => {
          navigate("/my-recipes")
        }, 2000)
      } else {
        response = await recipeAPI.create(formData)
        console.log("Recipe created:", response.data)
        setSuccess(true)
        setTimeout(() => {
          navigate("/my-recipes")
        }, 2000)
      }
    } catch (err: any) {
      console.error(`Error ${isEditing ? "updating" : "creating"} recipe:`, err)
      setError(err.response?.data?.message || err.message || `שגיאה ב${isEditing ? "עדכון" : "יצירת"} המתכון`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Rubik:wght@400;500;600;700;800&display=swap');
          
          .create-recipe-universe {
            background: radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 100%);
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
            padding: 40px 0;
          }
          
          .create-recipe-universe::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(0, 78, 137, 0.03) 0%, transparent 50%);
            pointer-events: none;
            z-index: 1;
          }
          
          .content-wrapper-3d {
            position: relative;
            z-index: 2;
          }
          
          .hero-3d-container {
            perspective: 1000px;
            text-align: center;
            margin: 40px 0 60px;
            position: relative;
          }
          
          .hero-title-3d {
            font-family: 'Montserrat', sans-serif;
            font-size: 4rem;
            font-weight: 800;
            color: #ffffff;
            text-shadow: 
              0 0 20px rgba(255, 107, 53, 0.8),
              0 5px 15px rgba(0, 0, 0, 0.5);
            transform: rotateX(15deg) rotateY(-5deg);
            transform-style: preserve-3d;
            animation: titleFloat 6s ease-in-out infinite;
            position: relative;
            display: inline-block;
          }
          
          @keyframes titleFloat {
            0%, 100% { transform: rotateX(15deg) rotateY(-5deg) translateY(0px); }
            50% { transform: rotateX(15deg) rotateY(-5deg) translateY(-8px); }
          }
          
          .form-paper-3d {
            background: rgba(26, 26, 46, 0.9) !important;
            backdrop-filter: blur(20px) !important;
            border-radius: 25px !important;
            border: 1px solid rgba(255, 107, 53, 0.3) !important;
            box-shadow: 
              0 25px 50px rgba(0, 0, 0, 0.3),
              0 0 40px rgba(255, 107, 53, 0.2) !important;
            overflow: hidden !important;
            transform: perspective(1000px) rotateX(3deg) !important;
            transition: all 0.4s ease !important;
            position: relative !important;
          }
          
          .form-paper-3d::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 107, 53, 0.02) 2px,
                rgba(255, 107, 53, 0.02) 4px
              );
            animation: scanlines 4s linear infinite;
            pointer-events: none;
          }
          
          @keyframes scanlines {
            0% { background-position: 0 0; }
            100% { background-position: 0 20px; }
          }
          
          .form-paper-3d:hover {
            transform: perspective(1000px) rotateX(0deg) translateY(-8px) !important;
            box-shadow: 
              0 35px 70px rgba(0, 0, 0, 0.4),
              0 0 50px rgba(255, 107, 53, 0.3) !important;
          }
          
          .form-content-3d {
            padding: 50px !important;
            position: relative !important;
            z-index: 2 !important;
          }
          
          .form-field-3d .MuiOutlinedInput-root {
            background: rgba(255, 255, 255, 0.05) !important;
            border-radius: 15px !important;
            transition: all 0.3s ease !important;
            color: #ffffff !important;
          }
          
          .form-field-3d .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
            border: 2px solid rgba(255, 107, 53, 0.3) !important;
            transition: all 0.3s ease !important;
          }
          
          .form-field-3d .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
            border-color: rgba(255, 107, 53, 0.6) !important;
            box-shadow: 0 0 20px rgba(255, 107, 53, 0.2) !important;
          }
          
          .form-field-3d .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: #ff6b35 !important;
            border-width: 2px !important;
            box-shadow: 0 0 25px rgba(255, 107, 53, 0.4) !important;
          }
          
          .form-field-3d .MuiInputLabel-root {
            color: rgba(255, 255, 255, 0.7) !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 500 !important;
          }
          
          .form-field-3d .MuiInputLabel-root.Mui-focused {
            color: #ff6b35 !important;
          }
          
          .form-field-3d input,
          .form-field-3d textarea {
            color: #ffffff !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 400 !important;
          }
          
          .section-title-3d {
            font-family: 'Montserrat', sans-serif !important;
            font-weight: 700 !important;
            color: #ffa500 !important;
            text-shadow: 0 0 15px rgba(255, 165, 0, 0.5) !important;
            margin-bottom: 25px !important;
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
          }
          
          .ingredient-row-3d {
            background: rgba(255, 255, 255, 0.03) !important;
            border-radius: 15px !important;
            padding: 20px !important;
            margin-bottom: 15px !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            transition: all 0.3s ease !important;
          }
          
          .ingredient-row-3d:hover {
            background: rgba(255, 107, 53, 0.05) !important;
            border-color: rgba(255, 107, 53, 0.2) !important;
            transform: translateY(-2px) !important;
          }
          
          .add-ingredient-button-3d {
            background: linear-gradient(45deg, #ff6b35, #ffa500) !important;
            color: #ffffff !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 600 !important;
            padding: 12px 25px !important;
            border-radius: 50px !important;
            border: none !important;
            box-shadow: 
              0 8px 25px rgba(0, 0, 0, 0.3),
              0 0 15px rgba(255, 107, 53, 0.4) !important;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            text-transform: none !important;
          }
          
          .add-ingredient-button-3d:hover {
            transform: translateY(-3px) scale(1.05) !important;
            box-shadow: 
              0 12px 35px rgba(0, 0, 0, 0.4),
              0 0 25px rgba(255, 107, 53, 0.6) !important;
          }
          
          .delete-ingredient-button-3d {
            background: rgba(220, 53, 69, 0.2) !important;
            color: #dc3545 !important;
            border: 1px solid rgba(220, 53, 69, 0.5) !important;
            transition: all 0.3s ease !important;
          }
          
          .delete-ingredient-button-3d:hover {
            background: rgba(220, 53, 69, 0.3) !important;
            box-shadow: 0 0 15px rgba(220, 53, 69, 0.4) !important;
            transform: scale(1.1) !important;
          }
          
          .submit-button-3d {
            background: linear-gradient(45deg, #ff6b35, #ffa500) !important;
            color: #ffffff !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 700 !important;
            font-size: 1.2rem !important;
            padding: 15px 50px !important;
            border-radius: 50px !important;
            border: none !important;
            box-shadow: 
              0 10px 30px rgba(0, 0, 0, 0.3),
              0 0 20px rgba(255, 107, 53, 0.4) !important;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            text-transform: none !important;
            position: relative !important;
            overflow: hidden !important;
          }
          
          .submit-button-3d::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.7s ease;
          }
          
          .submit-button-3d:hover {
            transform: translateY(-5px) scale(1.05) !important;
            box-shadow: 
              0 15px 40px rgba(0, 0, 0, 0.4),
              0 0 30px rgba(255, 107, 53, 0.6) !important;
          }
          
          .submit-button-3d:hover::before {
            left: 100%;
          }
          
          .switch-3d .MuiSwitch-switchBase.Mui-checked {
            color: #ff6b35 !important;
          }
          
          .switch-3d .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
            background-color: #ff6b35 !important;
          }
          
          .switch-label-3d {
            color: rgba(255, 255, 255, 0.9) !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 500 !important;
          }
          
          .auth-required-3d {
            text-align: center;
            padding: 80px 40px;
            background: rgba(26, 26, 46, 0.8);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            border: 1px solid rgba(255, 165, 0, 0.3);
            box-shadow: 
              0 25px 50px rgba(0, 0, 0, 0.3),
              0 0 40px rgba(255, 165, 0, 0.2);
            transform: perspective(1000px) rotateX(5deg);
          }
          
          .auth-button-3d {
            background: linear-gradient(45deg, #ff6b35, #ffa500) !important;
            color: #ffffff !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 600 !important;
            padding: 12px 30px !important;
            border-radius: 50px !important;
            border: none !important;
            box-shadow: 
              0 8px 25px rgba(0, 0, 0, 0.3),
              0 0 15px rgba(255, 107, 53, 0.4) !important;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            text-transform: none !important;
          }
          
          .auth-button-3d:hover {
            transform: translateY(-3px) scale(1.05) !important;
            box-shadow: 
              0 12px 35px rgba(0, 0, 0, 0.4),
              0 0 25px rgba(255, 107, 53, 0.6) !important;
          }

          .loading-3d {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 400px;
            background: rgba(26, 26, 46, 0.8);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 107, 53, 0.3);
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 107, 53, 0.2);
            transform: perspective(800px) rotateX(3deg);
          }
          
          @media (max-width: 768px) {
            .hero-title-3d {
              font-size: 2.5rem;
              transform: none;
            }
            
            .form-paper-3d {
              transform: none !important;
              margin: 20px !important;
            }
            
            .form-content-3d {
              padding: 30px !important;
            }
            
            .auth-required-3d {
              transform: none;
              margin: 20px;
            }

            .loading-3d {
              transform: none;
            }
          }
        `}
      </style>
      <div className="create-recipe-universe">
        <Container maxWidth="md" className="content-wrapper-3d">
          <div className="hero-3d-container">
            <Typography className="hero-title-3d" component="h1">
              {/* 🔥 כותרת דינמית */}
              {isEditing ? "✏️ עריכת מתכון" : "➕ יצירת מתכון חדש"}
            </Typography>
          </div>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: "20px",
                background: "rgba(26, 26, 46, 0.9)",
                backdropFilter: "blur(15px)",
                border: "2px solid #dc3545",
                color: "#ffffff",
                boxShadow: "0 0 30px rgba(220, 53, 69, 0.4)",
                "& .MuiAlert-icon": {
                  color: "#dc3545",
                },
              }}
            >
              {error}
            </Alert>
          )}

          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 3,
                borderRadius: "20px",
                background: "rgba(26, 26, 46, 0.9)",
                backdropFilter: "blur(15px)",
                border: "2px solid #4caf50",
                color: "#ffffff",
                boxShadow: "0 0 30px rgba(76, 175, 80, 0.4)",
                "& .MuiAlert-icon": {
                  color: "#4caf50",
                },
              }}
            >
              {/* 🔥 הודעת הצלחה דינמית */}
              המתכון {isEditing ? "עודכן" : "נוצר"} בהצלחה! מעביר אותך לעמוד המתכונים שלך...
            </Alert>
          )}

          <Paper elevation={3} className="form-paper-3d">
            <div className="form-content-3d">
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="שם המתכון"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-field-3d"
                      required
                    />
                  </Grid>

                  {/* 🔥 שדות נוספים */}
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="תיאור המתכון"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-field-3d"
                      multiline
                      rows={2}
                      placeholder="תיאור קצר ומעניין של המתכון..."
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="זמן הכנה (בדקות)"
                      name="preparationTime"
                      type="number"
                      value={formData.preparationTime}
                      onChange={handleChange}
                      className="form-field-3d"
                      inputProps={{ min: 1 }}
                      required
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="מספר מנות"
                      name="servings"
                      type="number"
                      value={formData.servings}
                      onChange={handleChange}
                      className="form-field-3d"
                      inputProps={{ min: 1 }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isPublic}
                          onChange={handleChange}
                          name="isPublic"
                          className="switch-3d"
                        />
                      }
                      label="פרסם מתכון זה לקהילה"
                      className="switch-label-3d"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Divider sx={{ my: 2, borderColor: "rgba(255, 107, 53, 0.3)" }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                      <Typography variant="h6" className="section-title-3d">
                        🥘 מרכיבים
                      </Typography>
                      <Button
                        startIcon={<AddIcon />}
                        onClick={addIngredient}
                        className="add-ingredient-button-3d"
                        size="small"
                      >
                        הוסף מרכיב
                      </Button>
                    </Box>

                    {formData.ingredients.map((ingredient, index) => (
                      <div key={index} className="ingredient-row-3d">
                        <Grid container spacing={2} alignItems="center">
                          <Grid size={{ xs: 12, sm: 3 }}>
                            <TextField
                              label="כמות"
                              type="number"
                              value={ingredient.quantity}
                              onChange={(e) => handleIngredientChange(index, "quantity", Number(e.target.value))}
                              inputProps={{ min: 0, step: 0.1 }}
                              className="form-field-3d"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 3 }}>
                            <TextField
                              label="יחידה"
                              value={ingredient.unit}
                              onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                              className="form-field-3d"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 5 }}>
                            <TextField
                              label="שם המרכיב"
                              value={ingredient.name}
                              onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                              className="form-field-3d"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 1 }}>
                            <IconButton
                              onClick={() => removeIngredient(index)}
                              disabled={formData.ingredients.length <= 1}
                              className="delete-ingredient-button-3d"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </div>
                    ))}
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Divider sx={{ my: 2, borderColor: "rgba(255, 107, 53, 0.3)" }} />
                    <Typography variant="h6" className="section-title-3d" sx={{ mb: 2 }}>
                      📝 הוראות הכנה
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={8}
                      label="הוראות הכנה"
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleChange}
                      placeholder="פרט את שלבי ההכנה בצורה מקצועית ומסודרת..."
                      className="form-field-3d"
                      required
                    />
                  </Grid>

                  {/* 🔥 שדה טיפים */}
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="טיפים נוספים (אופציונלי)"
                      name="tips"
                      value={formData.tips}
                      onChange={handleChange}
                      placeholder="טיפים שימושיים, המלצות או הערות מיוחדות..."
                      className="form-field-3d"
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        className="submit-button-3d"
                      >
                        {loading ? (
                          <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
                        ) : /* 🔥 טקסט כפתור דינמי */
                        isEditing ? (
                          "💾 עדכן מתכון"
                        ) : (
                          "🍳 צור מתכון"
                        )}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Paper>
        </Container>
      </div>
    </>
  )
}

export default CreateRecipePage
