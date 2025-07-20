"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import PersonIcon from "@mui/icons-material/Person"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import FavoriteIcon from "@mui/icons-material/Favorite"
import StarIcon from "@mui/icons-material/Star"
import { recipeAPI } from "../services/api"
import type { Recipe } from "../types"
import { useAuth } from "../context/AuthContext"

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return

      try {
        const response = await recipeAPI.getById(Number.parseInt(id))
        setRecipe(response.data)
      } catch (error) {
        console.error("Error fetching recipe:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  if (loading) {
    return (
      <div className="recipe-detail-universe">
        <div className="loading-3d">
          <CircularProgress
            size={100}
            sx={{
              color: "#ff6b35",
              filter: "drop-shadow(0 0 20px #ff6b35)",
            }}
          />
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="recipe-detail-universe">
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <div className="error-state-3d">
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
              😔 המתכון לא נמצא
            </Typography>
            <Box textAlign="center">
              <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} className="back-button-3d">
                חזרה
              </Button>
            </Box>
          </div>
        </Container>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("he-IL")
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Rubik:wght@400;500;600;700;800&display=swap');
          
          .recipe-detail-universe {
            background: radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 100%);
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
            padding: 40px 0;
          }
          
          .recipe-detail-universe::before {
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
          
          .back-button-3d {
            background: linear-gradient(45deg, #ff6b35, #ffa500) !important;
            color: #ffffff !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 600 !important;
            padding: 10px 25px !important;
            border-radius: 50px !important;
            border: none !important;
            box-shadow: 
              0 8px 25px rgba(0, 0, 0, 0.3),
              0 0 15px rgba(255, 107, 53, 0.4) !important;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            text-transform: none !important;
          }
          
          .back-button-3d:hover {
            transform: translateY(-3px) scale(1.05) !important;
            box-shadow: 
              0 12px 35px rgba(0, 0, 0, 0.4),
              0 0 25px rgba(255, 107, 53, 0.6) !important;
          }
          
          .recipe-hero-3d {
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
            margin-bottom: 40px !important;
            position: relative !important;
          }
          
          .recipe-hero-3d::before {
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
          
          .recipe-hero-3d:hover {
            transform: perspective(1000px) rotateX(0deg) translateY(-8px) !important;
            box-shadow: 
              0 35px 70px rgba(0, 0, 0, 0.4),
              0 0 50px rgba(255, 107, 53, 0.3) !important;
          }
          
          .recipe-image-hero-3d {
            position: relative;
            height: 400px;
            background-size: cover;
            background-position: center;
            overflow: hidden;
            border-radius: 25px 25px 0 0;
          }
          
          .recipe-image-hero-3d::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, transparent 0%, rgba(26, 26, 46, 0.8) 100%);
          }
          
          .recipe-content-hero-3d {
            padding: 40px !important;
            position: relative !important;
            z-index: 2 !important;
          }
          
          .recipe-title-hero-3d {
            font-family: 'Montserrat', sans-serif !important;
            font-weight: 800 !important;
            color: #ffffff !important;
            text-shadow: 0 0 20px rgba(255, 107, 53, 0.5) !important;
            margin-bottom: 25px !important;
            font-size: 2.5rem !important;
          }
          
          .recipe-meta-3d {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 15px !important;
            margin-bottom: 30px !important;
          }
          
          .chip-3d {
            background: rgba(255, 107, 53, 0.2) !important;
            color: #ffffff !important;
            border: 1px solid rgba(255, 107, 53, 0.5) !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 600 !important;
            backdrop-filter: blur(10px) !important;
            transition: all 0.3s ease !important;
            font-size: 0.9rem !important;
            padding: 8px 16px !important;
            height: auto !important;
          }
          
          .chip-3d:hover {
            background: rgba(255, 107, 53, 0.3) !important;
            box-shadow: 0 0 15px rgba(255, 107, 53, 0.4) !important;
            transform: translateY(-2px) !important;
          }
          
          .content-section-3d {
            background: rgba(26, 26, 46, 0.9) !important;
            backdrop-filter: blur(20px) !important;
            border-radius: 25px !important;
            border: 1px solid rgba(255, 107, 53, 0.3) !important;
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 107, 53, 0.2) !important;
            padding: 40px !important;
            margin-bottom: 30px !important;
            transform: perspective(1000px) rotateX(2deg) !important;
            transition: all 0.4s ease !important;
            position: relative !important;
            overflow: hidden !important;
          }
          
          .content-section-3d::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 3px,
                rgba(255, 107, 53, 0.02) 3px,
                rgba(255, 107, 53, 0.02) 6px
              );
            animation: patternMove 6s linear infinite;
            pointer-events: none;
          }
          
          @keyframes patternMove {
            0% { background-position: 0 0; }
            100% { background-position: 20px 20px; }
          }
          
          .content-section-3d:hover {
            transform: perspective(1000px) rotateX(0deg) translateY(-5px) !important;
            box-shadow: 
              0 25px 50px rgba(0, 0, 0, 0.4),
              0 0 40px rgba(255, 107, 53, 0.3) !important;
          }
          
          .section-title-3d {
            font-family: 'Montserrat', sans-serif !important;
            font-weight: 700 !important;
            color: #ffa500 !important;
            text-shadow: 0 0 15px rgba(255, 165, 0, 0.5) !important;
            margin-bottom: 25px !important;
            font-size: 1.8rem !important;
            position: relative !important;
            z-index: 2 !important;
          }
          
          .ingredients-list-3d {
            background: rgba(255, 255, 255, 0.05) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 15px !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            padding: 25px !important;
            position: relative !important;
            z-index: 2 !important;
          }
          
          .ingredient-item-3d {
            color: rgba(255, 255, 255, 0.9) !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 500 !important;
            transition: all 0.3s ease !important;
            border-radius: 8px !important;
            margin-bottom: 8px !important;
            padding: 8px 12px !important;
          }
          
          .ingredient-item-3d:hover {
            background: rgba(255, 107, 53, 0.1) !important;
            transform: translateX(5px) !important;
          }
          
          .instructions-3d {
            background: rgba(255, 255, 255, 0.05) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 15px !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            padding: 30px !important;
            color: rgba(255, 255, 255, 0.9) !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 500 !important;
            line-height: 1.8 !important;
            font-size: 1.1rem !important;
            position: relative !important;
            z-index: 2 !important;
          }
          
          .action-buttons-3d {
            display: flex !important;
            gap: 20px !important;
            justify-content: center !important;
            margin-top: 50px !important;
            flex-wrap: wrap !important;
          }
          
          .action-button-3d {
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
          
          .action-button-3d:hover {
            transform: translateY(-3px) scale(1.05) !important;
            box-shadow: 
              0 12px 35px rgba(0, 0, 0, 0.4),
              0 0 25px rgba(255, 107, 53, 0.6) !important;
          }
          
          .action-button-outline-3d {
            background: transparent !important;
            color: #ffa500 !important;
            border: 2px solid #ffa500 !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 600 !important;
            padding: 10px 28px !important;
            border-radius: 50px !important;
            box-shadow: 
              0 8px 25px rgba(0, 0, 0, 0.2),
              0 0 15px rgba(255, 165, 0, 0.3) !important;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            text-transform: none !important;
          }
          
          .action-button-outline-3d:hover {
            background: rgba(255, 165, 0, 0.1) !important;
            transform: translateY(-3px) scale(1.05) !important;
            box-shadow: 
              0 12px 35px rgba(0, 0, 0, 0.3),
              0 0 25px rgba(255, 165, 0, 0.5) !important;
          }
          
          .loading-3d {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 80vh;
            background: rgba(26, 26, 46, 0.8);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            border: 1px solid rgba(255, 107, 53, 0.3);
            box-shadow: 
              0 25px 50px rgba(0, 0, 0, 0.3),
              0 0 40px rgba(255, 107, 53, 0.2);
            margin: 40px;
            transform: perspective(1000px) rotateX(3deg);
          }
          
          .error-state-3d {
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
          
          @media (max-width: 768px) {
            .recipe-hero-3d {
              transform: none !important;
              margin: 20px !important;
            }
            
            .recipe-image-hero-3d {
              height: 250px;
            }
            
            .recipe-content-hero-3d {
              padding: 25px !important;
            }
            
            .recipe-title-hero-3d {
              font-size: 2rem !important;
            }
            
            .content-section-3d {
              transform: none !important;
              margin: 20px 0 !important;
              padding: 25px !important;
            }
            
            .action-buttons-3d {
              flex-direction: column !important;
              align-items: center !important;
            }
            
            .loading-3d {
              transform: none;
              margin: 20px;
            }
            
            .error-state-3d {
              transform: none;
            }
          }
        `}
      </style>

      <div className="recipe-detail-universe">
        <Container maxWidth="lg" className="content-wrapper-3d">
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} className="back-button-3d" sx={{ mb: 3 }}>
            חזרה למתכונים
          </Button>

          {/* Recipe Hero Section */}
          <Paper elevation={3} className="recipe-hero-3d">
            {recipe.imageUrl && (
              <div
                className="recipe-image-hero-3d"
                style={{
                  backgroundImage: `url(${recipe.imageUrl})`,
                }}
              />
            )}

            <div className="recipe-content-hero-3d">
              <Typography className="recipe-title-hero-3d">{recipe.title}</Typography>

              <div className="recipe-meta-3d">
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`זמן הכנה: ${recipe.preparationTime} דקות`}
                  className="chip-3d"
                />
                <Chip icon={<PersonIcon />} label={`מאת: משתמש #${recipe.userId}`} className="chip-3d" />
                <Chip
                  icon={<CalendarTodayIcon />}
                  label={`פורסם: ${formatDate(recipe.createdAt)}`}
                  className="chip-3d"
                />
              </div>
            </div>
          </Paper>

          <Grid container spacing={4}>
            {/* Ingredients Section */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Paper className="content-section-3d">
                <Typography className="section-title-3d">🥘 מרכיבים</Typography>
                <div className="ingredients-list-3d">
                  <List>
                    {recipe.ingredients.map((ingredient, index) => (
                      <ListItem key={index} className="ingredient-item-3d" disablePadding>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircleOutlineIcon
                            fontSize="small"
                            sx={{ color: "#ffa500", filter: "drop-shadow(0 0 5px rgba(255, 165, 0, 0.5))" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontFamily: "Rubik, sans-serif",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Paper>
            </Grid>

            {/* Instructions Section */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Paper className="content-section-3d">
                <Typography className="section-title-3d">📝 הוראות הכנה</Typography>
                <div className="instructions-3d">
                  <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {recipe.instructions}
                  </Typography>
                </div>
              </Paper>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          {isAuthenticated && (
            <div className="action-buttons-3d">
              <Button variant="contained" startIcon={<StarIcon />} className="action-button-3d">
                דרג מתכון
              </Button>
              <Button variant="outlined" startIcon={<FavoriteIcon />} className="action-button-outline-3d">
                שמור למועדפים
              </Button>
            </div>
          )}
        </Container>
      </div>
    </>
  )
}

export default RecipeDetailPage
