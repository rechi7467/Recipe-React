"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Container, Typography, Button, Paper, CircularProgress } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { recipeAPI } from "../services/api"
import type { Recipe } from "../types"
import RecipeCard from "../components/Recipe/RecipeCard"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import LoginIcon from "@mui/icons-material/Login"
import AddIcon from "@mui/icons-material/Add"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import VisibilityIcon from "@mui/icons-material/Visibility"

const LandingPage: React.FC = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const response = await recipeAPI.getAll()
        let recipes = response.data.filter((recipe: Recipe) => recipe.isPublic)

        if (!isAuthenticated) {
          recipes = recipes.slice(0, 6)
        }

        setFeaturedRecipes(recipes)
      } catch (error) {
        console.error("Error fetching featured recipes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedRecipes()
  }, [isAuthenticated])

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Rubik:wght@400;500;600;700;800&display=swap');
          
          .landing-universe {
            background: radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 100%);
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
          }
          
          .landing-universe::before {
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
            padding: 60px 0;
          }
          
          .hero-section-3d {
            text-align: center;
            margin-bottom: 80px;
            perspective: 1000px;
          }
          
          .hero-logo-3d {
            width: 120px;
            height: 120px;
            background-image: url('/images/logo.png');
            background-size: cover;
            background-position: center;
            margin: 0 auto 30px;
            border-radius: 50%;
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 107, 53, 0.4);
            animation: logoFloat 4s ease-in-out infinite;
            border: 3px solid rgba(255, 107, 53, 0.5);
          }
          
          @keyframes logoFloat {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-10px) scale(1.05); }
          }
          
          .hero-title-3d {
            font-family: 'Montserrat', sans-serif;
            font-size: 4.5rem;
            font-weight: 800;
            color: #ffffff;
            text-shadow: 
              0 0 20px rgba(255, 107, 53, 0.8),
              0 5px 15px rgba(0, 0, 0, 0.5);
            transform: rotateX(10deg) rotateY(-3deg);
            transform-style: preserve-3d;
            animation: titleFloat 6s ease-in-out infinite;
            margin-bottom: 25px;
            line-height: 1.1;
          }
          
          @keyframes titleFloat {
            0%, 100% { transform: rotateX(10deg) rotateY(-3deg) translateY(0px); }
            50% { transform: rotateX(10deg) rotateY(-3deg) translateY(-8px); }
          }
          
          .hero-slogan-3d {
            font-family: 'Rubik', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            color: #ffa500;
            text-shadow: 0 0 20px rgba(255, 165, 0, 0.7);
            margin-bottom: 20px;
            animation: sloganPulse 3s ease-in-out infinite alternate;
          }
          
          @keyframes sloganPulse {
            0% { opacity: 0.9; transform: translateY(0); }
            100% { opacity: 1; transform: translateY(-3px); }
          }
          
          .hero-subtitle-3d {
            font-family: 'Rubik', sans-serif;
            font-size: 1.3rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 40px;
            line-height: 1.6;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .cta-buttons-3d {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 60px;
          }
          
          .cta-button-3d {
            background: linear-gradient(45deg, #ff6b35, #ffa500) !important;
            color: #ffffff !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 700 !important;
            font-size: 1.1rem !important;
            padding: 15px 35px !important;
            border-radius: 50px !important;
            border: none !important;
            box-shadow: 
              0 10px 30px rgba(0, 0, 0, 0.3),
              0 0 20px rgba(255, 107, 53, 0.4) !important;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            text-transform: none !important;
            position: relative !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
          }
          
          .cta-button-3d::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.7s ease;
          }
          
          .cta-button-3d:hover {
            transform: translateY(-5px) scale(1.05) !important;
            box-shadow: 
              0 15px 40px rgba(0, 0, 0, 0.4),
              0 0 30px rgba(255, 107, 53, 0.6) !important;
          }
          
          .cta-button-3d:hover::before {
            left: 100%;
          }
          
          .cta-button-outline-3d {
            background: transparent !important;
            color: #ffa500 !important;
            border: 2px solid #ffa500 !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 700 !important;
            font-size: 1.1rem !important;
            padding: 13px 33px !important;
            border-radius: 50px !important;
            box-shadow: 
              0 8px 25px rgba(0, 0, 0, 0.2),
              0 0 15px rgba(255, 165, 0, 0.3) !important;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            text-transform: none !important;
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
          }
          
          .cta-button-outline-3d:hover {
            background: rgba(255, 165, 0, 0.1) !important;
            transform: translateY(-5px) scale(1.05) !important;
            box-shadow: 
              0 15px 35px rgba(0, 0, 0, 0.3),
              0 0 25px rgba(255, 165, 0, 0.5) !important;
            color: #ffffff !important;
          }
          
          .featured-section-3d {
            margin: 80px 0;
          }
          
          .section-title-3d {
            font-family: 'Montserrat', sans-serif;
            font-weight: 800;
            color: #ffffff;
            text-shadow: 0 0 20px rgba(255, 107, 53, 0.7);
            text-align: center;
            margin-bottom: 60px;
            font-size: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }
          
          .section-emoji {
            font-size: 3.5rem;
            filter: drop-shadow(0 0 15px rgba(255, 107, 53, 0.6));
            animation: emojiFloat 3s ease-in-out infinite;
          }
          
          @keyframes emojiFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(5deg); }
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
          
          .features-section-3d {
            margin: 100px 0;
          }
          
          .features-grid-3d {
            perspective: 1200px;
          }
          
          .feature-card-3d {
            background: rgba(26, 26, 46, 0.9) !important;
            backdrop-filter: blur(20px) !important;
            border-radius: 25px !important;
            border: 1px solid rgba(255, 107, 53, 0.3) !important;
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 107, 53, 0.2) !important;
            padding: 40px !important;
            text-align: center !important;
            height: 100% !important;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            transform-style: preserve-3d !important;
            position: relative !important;
            overflow: hidden !important;
          }
          
          .feature-card-3d::before {
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
          
          .feature-card-3d:hover {
            transform: translateY(-15px) rotateX(10deg) rotateY(5deg) !important;
            box-shadow: 
              0 30px 60px rgba(0, 0, 0, 0.4),
              0 0 40px rgba(255, 107, 53, 0.3) !important;
          }
          
          .feature-image-3d {
            width: 100%;
            height: 200px;
            background-size: cover;
            background-position: center;
            border-radius: 15px;
            margin-bottom: 25px;
            position: relative;
            z-index: 2;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
          }
          
          .feature-card-3d:hover .feature-image-3d {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          }
          
          .feature-title-3d {
            font-family: 'Montserrat', sans-serif !important;
            font-weight: 700 !important;
            color: #ffffff !important;
            margin-bottom: 15px !important;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3) !important;
            position: relative !important;
            z-index: 2 !important;
          }
          
          .feature-description-3d {
            font-family: 'Rubik', sans-serif !important;
            font-weight: 500 !important;
            color: rgba(255, 255, 255, 0.8) !important;
            line-height: 1.6 !important;
            position: relative !important;
            z-index: 2 !important;
          }
          
          .loading-3d {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 300px;
            background: rgba(26, 26, 46, 0.8);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            border: 1px solid rgba(255, 107, 53, 0.3);
            box-shadow: 
              0 20px 40px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 107, 53, 0.2);
            transform: perspective(800px) rotateX(3deg);
          }
          
          .view-all-button-3d {
            display: flex;
            justify-content: center;
            margin-top: 50px;
          }
          
          @media (max-width: 768px) {
            .hero-logo-3d {
              width: 80px;
              height: 80px;
            }
            
            .hero-title-3d {
              font-size: 2.8rem;
              transform: none;
            }
            
            .hero-slogan-3d {
              font-size: 1.6rem;
            }
            
            .hero-subtitle-3d {
              font-size: 1.1rem;
            }
            
            .cta-buttons-3d {
              justify-content: center;
              flex-direction: column;
              align-items: center;
            }
            
            .section-title-3d {
              font-size: 2.2rem;
              flex-direction: column;
              gap: 10px;
            }
            
            .section-emoji {
              font-size: 2.5rem;
            }
            
            .loading-3d {
              transform: none;
            }
          }
        `}
      </style>

      <div className="landing-universe">
        <Container maxWidth="lg" className="content-wrapper-3d">
          {/* Hero Section */}
          <div className="hero-section-3d">
            <div className="hero-logo-3d"></div>

            <Typography className="hero-title-3d" component="h1">
              FlavorFile 🍳
            </Typography>

            <Typography className="hero-slogan-3d" component="h2">
              כל מתכון במקומו המושלם!
            </Typography>

            <Typography className="hero-subtitle-3d">
              {!isAuthenticated
                ? "גלו את המתכונים הפופולריים והטעימים ביותר מהקהילה שלנו. הצטרפו אלינו ותיהנו מחוויית בישול מקצועית ומסודרת."
                : "ברוכים השבים! גלו מתכונים חדשים מהקהילה, שתפו את המתכונים שלכם וצרו את אוסף המתכונים המושלם שלכם."}
            </Typography>

            {!isAuthenticated ? (
              <div className="cta-buttons-3d">
                <Button className="cta-button-3d" size="large" onClick={() => navigate("/register")}>
                  <RocketLaunchIcon />
                  הירשם עכשיו
                </Button>
                <Button className="cta-button-outline-3d" size="large" onClick={() => navigate("/login")}>
                  <LoginIcon />
                  התחבר
                </Button>
              </div>
            ) : (
              <div className="cta-buttons-3d">
                <Button className="cta-button-3d" size="large" onClick={() => navigate("/create-recipe")}>
                  <AddIcon />
                  צור מתכון חדש
                </Button>
                <Button className="cta-button-outline-3d" size="large" onClick={() => navigate("/my-recipes")}>
                  <MenuBookIcon />
                  המתכונים שלי
                </Button>
              </div>
            )}
          </div>

          {/* Featured Recipes Section */}
          <div className="featured-section-3d">
            <Typography variant="h3" className="section-title-3d">
              <span className="section-emoji">{!isAuthenticated ? "🔥" : "👥"}</span>
              {!isAuthenticated ? "המתכונים הפופולריים ביותר" : "מתכונים מהקהילה"}
            </Typography>

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
            ) : featuredRecipes.length > 0 ? (
              <>
                <Grid container spacing={4} className="recipes-grid-3d">
                  {featuredRecipes.map((recipe) => (
                    <Grid key={recipe.id} size={{ xs: 12, sm: 6, md: 4 }} className="recipe-card-wrapper-3d">
                      <RecipeCard recipe={recipe} onClick={() => navigate(`/recipe/${recipe.id}`)} />
                    </Grid>
                  ))}
                </Grid>

                {isAuthenticated && (
                  <div className="view-all-button-3d">
                    <Button className="cta-button-outline-3d" size="large" onClick={() => navigate("/recipes")}>
                      <VisibilityIcon />
                      צפה בכל המתכונים
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="loading-3d">
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "Rubik, sans-serif",
                    textAlign: "center",
                  }}
                >
                  😔 אין מתכונים זמינים כרגע
                </Typography>
              </div>
            )}
          </div>

          {/* Features Section - רק אם לא מחובר */}
          {!isAuthenticated && (
            <div className="features-section-3d">
              <Typography variant="h3" className="section-title-3d">
                <span className="section-emoji">⭐</span>
                למה לבחור ב-FlavorFile?
              </Typography>

              <Grid container spacing={4} className="features-grid-3d">
                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper className="feature-card-3d" elevation={0}>
                    <div
                      className="feature-image-3d"
                      style={{
                        backgroundImage: `url(/images/hero-cooking.png)`,
                      }}
                    />
                    <Typography variant="h6" className="feature-title-3d">
                      📁 ארגון מושלם
                    </Typography>
                    <Typography variant="body1" className="feature-description-3d">
                      שמרו את המתכונים שלכם בצורה מסודרת וקלה למציאה עם מערכת תיוק מתקדמת ואינטואיטיבית
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper className="feature-card-3d" elevation={0}>
                    <div
                      className="feature-image-3d"
                      style={{
                        backgroundImage: `url(/images/community-cooking.png)`,
                      }}
                    />
                    <Typography variant="h6" className="feature-title-3d">
                      🤝 שיתוף קהילתי
                    </Typography>
                    <Typography variant="body1" className="feature-description-3d">
                      שתפו את המתכונים הטעימים שלכם עם הקהילה וגלו מתכונים חדשים ומעוררי השראה מכל העולם
                    </Typography>
                  </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Paper className="feature-card-3d" elevation={0}>
                    <div
                      className="feature-image-3d"
                      style={{
                        backgroundImage: `url(/images/search-recipes.png)`,
                      }}
                    />
                    <Typography variant="h6" className="feature-title-3d">
                      🔍 חיפוש מתקדם
                    </Typography>
                    <Typography variant="body1" className="feature-description-3d">
                      מצאו בקלות את המתכון המושלם לכל אירוע עם מנוע חיפוש חכם ומתקדם עם פילטרים מגוונים
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          )}
        </Container>
      </div>
    </>
  )
}

export default LandingPage
