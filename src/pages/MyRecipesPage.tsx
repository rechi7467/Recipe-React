"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Container, Typography, Box, Button, CircularProgress, Tabs, Tab, Paper, Alert, IconButton, Tooltip } from "@mui/material"
import Grid from "@mui/material/Grid2"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useNavigate } from "react-router-dom"
import { recipeAPI } from "../services/api"
import type { Recipe } from "../types"
import RecipeCard from "../components/Recipe/RecipeCard"
import { useAuth } from "../context/AuthContext"

const MyRecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) return

    const fetchMyRecipes = async () => {
      try {
        const response = await recipeAPI.getMyRecipes()
        setRecipes(response.data)
      } catch (error) {
        console.error("Error fetching my recipes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMyRecipes()
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">עליך להתחבר כדי לצפות במתכונים שלך</Alert>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => navigate("/login")}>
            התחבר
          </Button>
        </Box>
      </Container>
    )
  }

  const publicRecipes = recipes.filter((recipe) => recipe.isPublic === true)
  const privateRecipes = recipes.filter((recipe) => recipe.isPublic === false)

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleRecipeClick = (id: number) => {
    navigate(`/recipe/${id}`)
  }

  const handleEditRecipe = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    navigate(`/edit-recipe/${id}`)
  }

  const handleDeleteRecipe = async (e: React.MouseEvent, recipe: Recipe) => {
    e.stopPropagation()
    if (window.confirm(`האם אתה בטוח שברצונך למחוק את המתכון "${recipe.title}"?`)) {
      try {
        setDeleteLoading(recipe.id)
        await recipeAPI.delete(recipe.id)
        setRecipes((prevRecipes) => prevRecipes.filter((r) => r.id !== recipe.id))
      } catch (err: any) {
        console.error("Error deleting recipe:", err)
        alert("שגיאה במחיקת המתכון")
      } finally {
        setDeleteLoading(null)
      }
    }
  }

  const currentRecipes = tabValue === 0 ? recipes : tabValue === 1 ? publicRecipes : privateRecipes

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Rubik:wght@400;500;600;700;800&display=swap');
          
          .my-recipes-universe {
            background: radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 100%);
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
          }
          
          .hero-3d-container {
            perspective: 1000px;
            text-align: center;
            margin: 60px 0;
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
          
          .create-button-3d {
            background: linear-gradient(45deg, #ff6b35, #ffa500);
            color: #ffffff;
            font-family: 'Rubik', sans-serif;
            font-weight: 700;
            font-size: 1.1rem;
            padding: 12px 30px;
            border-radius: 50px;
            border: none;
            box-shadow: 
              0 10px 30px rgba(0, 0, 0, 0.3),
              0 0 20px rgba(255, 107, 53, 0.4);
            transform: rotateX(10deg);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
          }
          
          .create-button-3d:hover {
            transform: rotateX(0deg) translateY(-5px) scale(1.05);
            box-shadow: 
              0 15px 40px rgba(0, 0, 0, 0.4),
              0 0 30px rgba(255, 107, 53, 0.6);
          }
          
          .tabs-3d-container {
            perspective: 800px;
            margin: 40px auto;
            max-width: 600px;
          }
          
          .tabs-3d-paper {
            background: rgba(26, 26, 46, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 107, 53, 0.3);
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 107, 53, 0.2);
            transform: rotateX(5deg);
            transition: all 0.4s ease;
            overflow: hidden;
          }
          
          .tabs-3d-paper:hover {
            transform: rotateX(0deg) translateY(-5px);
          }
          
          .recipe-card-wrapper-3d {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
            position: relative;
          }
          
          .recipe-card-wrapper-3d:hover {
            transform: translateY(-15px) rotateX(10deg) rotateY(5deg);
            filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
          }
          
          .recipe-actions {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 5px;
            z-index: 10;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
          }
          
          .recipe-card-wrapper-3d:hover .recipe-actions {
            opacity: 1;
            transform: translateY(0);
          }
          
          .action-button {
            background: rgba(26, 26, 46, 0.9) !important;
            backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: #ffffff !important;
            transition: all 0.3s ease !important;
          }
          
          .edit-button:hover {
            background: rgba(0, 78, 137, 0.8) !important;
            box-shadow: 0 0 15px rgba(0, 78, 137, 0.6) !important;
          }
          
          .delete-button:hover {
            background: rgba(220, 53, 69, 0.8) !important;
            box-shadow: 0 0 15px rgba(220, 53, 69, 0.6) !important;
          }
          
          .loading-3d {
            display: flex;
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
          
          .empty-state-3d {
            text-align: center;
            padding: 80px 40px;
            background: rgba(26, 26, 46, 0.8);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 165, 0, 0.3);
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 165, 0, 0.2);
            transform: perspective(800px) rotateX(5deg);
          }
          
          .content-wrapper-3d {
            position: relative;
            z-index: 2;
            padding: 40px 0;
          }
          
          @media (max-width: 768px) {
            .hero-title-3d {
              font-size: 2.5rem;
              transform: none;
            }
            
            .tabs-3d-paper {
              transform: none;
            }
            
            .loading-3d {
              transform: none;
            }
            
            .empty-state-3d {
              transform: none;
            }
          }
        `}
      </style>

      <div className="my-recipes-universe">
        <Container maxWidth="lg" className="content-wrapper-3d">
          <div className="hero-3d-container">
            <Typography className="hero-title-3d" component="h1">
              📚 המתכונים שלי
            </Typography>
          </div>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/create-recipe")}
              className="create-button-3d"
            >
              צור מתכון חדש
            </Button>
          </Box>

          <div className="tabs-3d-container">
            <Paper className="tabs-3d-paper">
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                centered
                sx={{
                  '& .MuiTab-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 600,
                  },
                  '& .MuiTab-root.Mui-selected': {
                    color: '#ff6b35',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#ff6b35',
                  },
                }}
              >
                <Tab label="הכל" />
                <Tab label="מתכונים ציבוריים" />
                <Tab label="מתכונים פרטיים" />
              </Tabs>
            </Paper>
          </div>

          {loading ? (
            <div className="loading-3d">
              <CircularProgress
                size={80}
                sx={{
                  color: "#ff6b35",
                  filter: "drop-shadow(0 0 15px #ff6b35)",
                }}
              />
            </div>
          ) : currentRecipes.length > 0 ? (
            <Grid container spacing={4}>
              {currentRecipes.map((recipe) => (
                <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4 }} className="recipe-card-wrapper-3d">
                  <div className="recipe-actions">
                    <Tooltip title="ערוך מתכון">
                      <IconButton
                        size="small"
                        className="action-button edit-button"
                        onClick={(e) => handleEditRecipe(e, recipe.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="מחק מתכון">
                      <IconButton
                        size="small"
                        className="action-button delete-button"
                        onClick={(e) => handleDeleteRecipe(e, recipe)}
                        disabled={deleteLoading === recipe.id}
                      >
                        {deleteLoading === recipe.id ? (
                          <CircularProgress size={16} sx={{ color: "#ffffff" }} />
                        ) : (
                          <DeleteIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </div>
                  <RecipeCard recipe={recipe} onClick={() => handleRecipeClick(recipe.id)} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <div className="empty-state-3d">
              <Typography 
                variant="h5" 
                sx={{ 
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  color: '#ffffff',
                  mb: 2,
                  textShadow: '0 0 15px rgba(255, 165, 0, 0.5)'
                }}
              >
                😔 אין לך עדיין מתכונים {tabValue === 1 ? "ציבוריים" : tabValue === 2 ? "פרטיים" : ""}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontFamily: 'Rubik, sans-serif',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 3
                }}
              >
                זה הזמן ליצור את המתכון הראשון שלך!
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/create-recipe")}
                className="create-button-3d"
              >
                צור מתכון חדש
              </Button>
            </div>
          )}
        </Container>
      </div>
    </>
  )
}

export default MyRecipesPage
