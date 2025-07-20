"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import SearchIcon from "@mui/icons-material/Search"
import SortIcon from "@mui/icons-material/Sort"
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"
import { useNavigate } from "react-router-dom"
import { recipeAPI } from "../services/api"
import type { Recipe } from "../types"
import RecipeCard from "../components/Recipe/RecipeCard"

const PublicRecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  const recipesPerPage = 12

  useEffect(() => {
    fetchRecipes()
  }, [currentPage, searchTerm, sortBy])

  const fetchRecipes = async () => {
    try {
      setLoading(true)
      const response = await recipeAPI.getAll()
      let filteredRecipes = response.data.filter((recipe: Recipe) => recipe.isPublic)

      if (searchTerm) {
        filteredRecipes = filteredRecipes.filter(
          (recipe: Recipe) =>
            recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.instructions.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      switch (sortBy) {
        case "newest":
          filteredRecipes.sort(
            (a: Recipe, b: Recipe) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
          )
          break
        case "oldest":
          filteredRecipes.sort(
            (a: Recipe, b: Recipe) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime(),
          )
          break
        case "alphabetical":
          filteredRecipes.sort((a: Recipe, b: Recipe) => a.title.localeCompare(b.title))
          break
        case "time":
          filteredRecipes.sort((a: Recipe, b: Recipe) => a.preparationTime - b.preparationTime)
          break
      }

      const startIndex = (currentPage - 1) * recipesPerPage
      const endIndex = startIndex + recipesPerPage
      const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex)

      setRecipes(paginatedRecipes)
      setTotalPages(Math.ceil(filteredRecipes.length / recipesPerPage))
    } catch (err: any) {
      console.error("Error fetching recipes:", err)
      setError("שגיאה בטעינת המתכונים")
    } finally {
      setLoading(false)
    }
  }

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.id}`)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Rubik:wght@400;500;600;700;800&display=swap');
          
          .recipes-universe {
            background: radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 100%);
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
          }
          
          .recipes-universe::before {
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
            padding: 40px 0;
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
          
          .search-panel-3d {
            perspective: 800px;
            margin: 40px auto;
            max-width: 900px;
          }
          
          .search-container-3d {
            background: rgba(26, 26, 46, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 107, 53, 0.3);
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 107, 53, 0.2);
            padding: 30px;
            transform: rotateX(5deg);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
          }
          
          .search-container-3d::before {
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
                rgba(255, 107, 53, 0.05) 2px,
                rgba(255, 107, 53, 0.05) 4px
              );
            animation: scanlines 3s linear infinite;
            pointer-events: none;
          }
          
          .search-container-3d:hover {
            transform: rotateX(0deg) translateY(-5px);
            box-shadow: 
              0 30px 60px rgba(0, 0, 0, 0.4),
              0 0 40px rgba(255, 107, 53, 0.3);
          }
          
          @keyframes scanlines {
            0% { background-position: 0 0; }
            100% { background-position: 0 20px; }
          }
          
          .search-field-enhanced .MuiOutlinedInput-root {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            transition: all 0.3s ease;
            position: relative;
            z-index: 2;
          }
          
          .search-field-enhanced .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
            border: 2px solid rgba(255, 107, 53, 0.3);
            transition: all 0.3s ease;
          }
          
          .search-field-enhanced .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
            border-color: rgba(255, 107, 53, 0.6);
            box-shadow: 0 0 20px rgba(255, 107, 53, 0.2);
          }
          
          .search-field-enhanced .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: #ff6b35;
            border-width: 2px;
            box-shadow: 0 0 25px rgba(255, 107, 53, 0.4);
          }
          
          .search-field-enhanced .MuiInputLabel-root {
            color: rgba(255, 255, 255, 0.7);
            font-weight: 600;
            position: relative;
            z-index: 2;
          }
          
          .search-field-enhanced .MuiInputLabel-root.Mui-focused {
            color: #ff6b35;
          }
          
          .search-field-enhanced input {
            color: #ffffff;
            font-weight: 500;
            position: relative;
            z-index: 2;
          }
          
          .search-field-enhanced .MuiSvgIcon-root {
            color: #ff6b35;
            filter: drop-shadow(0 0 5px rgba(255, 107, 53, 0.5));
            position: relative;
            z-index: 2;
          }
          
          .results-counter-3d {
            background: rgba(26, 26, 46, 0.8);
            backdrop-filter: blur(15px);
            border-radius: 15px;
            border: 1px solid rgba(255, 165, 0, 0.4);
            box-shadow: 
              0 10px 30px rgba(0, 0, 0, 0.2),
              0 0 20px rgba(255, 165, 0, 0.3);
            padding: 20px;
            margin: 30px 0;
            text-align: center;
            transform: perspective(600px) rotateX(3deg);
            transition: all 0.3s ease;
          }
          
          .results-counter-3d:hover {
            transform: perspective(600px) rotateX(0deg) translateY(-3px);
            box-shadow: 
              0 15px 40px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 165, 0, 0.4);
          }
          
          .results-text-3d {
            font-family: 'Rubik', sans-serif;
            font-weight: 700;
            color: #ffffff;
            font-size: 1.2rem;
            text-shadow: 0 0 10px rgba(255, 165, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }
          
          .recipes-grid-3d {
            perspective: 1200px;
          }
          
          .recipe-card-wrapper-3d {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform-style: preserve-3d;
          }
          
          .recipe-card-wrapper-3d:hover {
            transform: translateY(-15px) rotateX(10deg) rotateY(5deg);
            filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.3));
          }
          
          .pagination-3d-container {
            display: flex;
            justify-content: center;
            margin-top: 60px;
            perspective: 800px;
          }
          
          .pagination-enhanced .MuiPaginationItem-root {
            margin: 0 5px;
            border-radius: 12px;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            font-weight: 600;
            background: rgba(26, 26, 46, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 107, 53, 0.3);
            color: #ffffff;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transform: perspective(400px) rotateX(5deg);
          }
          
          .pagination-enhanced .MuiPaginationItem-root:hover {
            background: rgba(255, 107, 53, 0.2);
            transform: perspective(400px) rotateX(0deg) translateY(-3px);
            box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
            border-color: #ff6b35;
          }
          
          .pagination-enhanced .MuiPaginationItem-root.Mui-selected {
            background: linear-gradient(45deg, #ff6b35, #ffa500);
            color: #1a1a2e;
            box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
            transform: perspective(400px) rotateX(0deg) translateY(-5px) scale(1.1);
            border-color: #ffa500;
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
            position: relative;
            overflow: hidden;
          }
          
          .loading-3d::before {
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
                transparent 5px,
                rgba(255, 107, 53, 0.05) 5px,
                rgba(255, 107, 53, 0.05) 10px
              );
            animation: loadingPattern 2s linear infinite;
          }
          
          @keyframes loadingPattern {
            0% { background-position: 0 0; }
            100% { background-position: 20px 20px; }
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
            position: relative;
          }
          
          .empty-state-3d::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 20%;
            right: 20%;
            height: 10px;
            background: radial-gradient(ellipse, rgba(255, 165, 0, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            filter: blur(8px);
          }
          
          .empty-title-3d {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 20px;
            text-shadow: 0 0 15px rgba(255, 165, 0, 0.5);
          }
          
          .empty-subtitle-3d {
            font-family: 'Rubik', sans-serif;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.7);
          }
          
          @media (max-width: 768px) {
            .hero-title-3d {
              font-size: 2.5rem;
              transform: none;
            }
            
            .search-container-3d {
              transform: none;
              padding: 20px;
            }
            
            .results-counter-3d {
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

      <div className="recipes-universe">
        <Container maxWidth="lg" className="content-wrapper-3d">
          {/* Hero Title */}
          <div className="hero-3d-container">
            <Typography className="hero-title-3d" component="h1">
              🍽️ גלריית המתכונים
            </Typography>
          </div>

          {/* Search Panel */}
          <div className="search-panel-3d">
            <div className="search-container-3d">
              <Grid container spacing={3} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="חיפוש מתכונים"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-field-enhanced"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth className="search-field-enhanced">
                    <InputLabel>מיון לפי</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      label="מיון לפי"
                      startAdornment={
                        <InputAdornment position="start">
                          <SortIcon />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="newest">החדשים ביותר</MenuItem>
                      <MenuItem value="oldest">הישנים ביותר</MenuItem>
                      <MenuItem value="alphabetical">סדר אלפביתי</MenuItem>
                      <MenuItem value="time">זמן הכנה</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </div>

          {/* Results Counter */}
          <div className="results-counter-3d">
            <Typography className="results-text-3d">
              <RestaurantMenuIcon />
              נמצאו {recipes.length} מתכונים מעולים
            </Typography>
          </div>

          {/* Error State */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: "15px" }}>
              {error}
            </Alert>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="loading-3d">
              <CircularProgress
                size={80}
                sx={{
                  color: "#ff6b35",
                  filter: "drop-shadow(0 0 15px #ff6b35)",
                  position: "relative",
                  zIndex: 2,
                }}
              />
            </div>
          ) : (
            <>
              {/* Recipes Grid */}
              <Grid container spacing={4} className="recipes-grid-3d">
                {recipes.length > 0 ? (
                  recipes.map((recipe) => (
                    <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4 }} className="recipe-card-wrapper-3d">
                      <RecipeCard recipe={recipe} onClick={() => handleRecipeClick(recipe)} />
                    </Grid>
                  ))
                ) : (
                  <Grid size={{ xs: 12 }}>
                    <div className="empty-state-3d">
                      <Typography variant="h5" className="empty-title-3d">
                        😔 לא נמצאו מתכונים התואמים לחיפוש
                      </Typography>
                      <Typography variant="body1" className="empty-subtitle-3d">
                        נסה לשנות את מילות החיפוש או הקטגוריה
                      </Typography>
                    </div>
                  </Grid>
                )}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box className="pagination-3d-container">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    className="pagination-enhanced"
                  />
                </Box>
              )}
            </>
          )}
        </Container>
      </div>
    </>
  )
}

export default PublicRecipesPage
