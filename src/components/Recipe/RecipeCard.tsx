"use client"

import type React from "react"
import { Card, CardMedia, CardContent, Typography, Chip, Box } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import type { Recipe } from "../../types"

interface RecipeCardProps {
  recipe: Recipe
  onClick?: () => void
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <>
      <style>
        {`
          .recipe-card-insane {
            max-width: 345px !important;
            cursor: ${onClick ? "pointer" : "default"} !important;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(20px) !important;
            border-radius: 20px !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 
              0 15px 35px rgba(0, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
            transform: perspective(1000px) rotateX(5deg) !important;
            position: relative !important;
            overflow: hidden !important;
          }
          
          .recipe-card-insane::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(255, 51, 102, 0.1), rgba(0, 204, 255, 0.1));
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1;
            pointer-events: none;
          }
          
          .recipe-card-insane:hover {
            transform: perspective(1000px) rotateX(0deg) translateY(-15px) scale(1.05) !important;
            box-shadow: 
              0 25px 50px rgba(0, 0, 0, 0.3),
              0 0 30px rgba(255, 51, 102, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          }
          
          .recipe-card-insane:hover::before {
            opacity: 1;
          }
          
          .recipe-media-insane {
            position: relative !important;
            z-index: 2 !important;
            border-radius: 15px 15px 0 0 !important;
            overflow: hidden !important;
          }
          
          .recipe-media-insane::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
            z-index: 1;
          }
          
          .recipe-content-insane {
            position: relative !important;
            z-index: 2 !important;
            background: rgba(255, 255, 255, 0.05) !important;
            backdrop-filter: blur(10px) !important;
          }
          
          .recipe-title-insane {
            color: #ffffff !important;
            font-weight: 700 !important;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3) !important;
            font-family: 'Exo 2', sans-serif !important;
          }
          
          .recipe-time-insane {
            color: rgba(255, 255, 255, 0.8) !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
            margin-bottom: 12px !important;
          }
          
          .recipe-time-icon-insane {
            color: #ffcc00 !important;
            filter: drop-shadow(0 0 5px rgba(255, 204, 0, 0.5)) !important;
          }
          
          .recipe-description-insane {
            color: rgba(255, 255, 255, 0.7) !important;
            line-height: 1.5 !important;
            margin-bottom: 15px !important;
          }
          
          .recipe-chips-insane {
            display: flex !important;
            gap: 8px !important;
            flex-wrap: wrap !important;
          }
          
          .recipe-chip-ingredients-insane {
            background: linear-gradient(45deg, #ff3366, #ff6b9d) !important;
            color: white !important;
            font-weight: 600 !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 5px 15px rgba(255, 51, 102, 0.3) !important;
          }
          
          .recipe-chip-public-insane {
            background: linear-gradient(45deg, #00cc66, #00ff88) !important;
            color: white !important;
            font-weight: 600 !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 5px 15px rgba(0, 204, 102, 0.3) !important;
          }
          
          .recipe-chip-private-insane {
            background: linear-gradient(45deg, #666666, #888888) !important;
            color: white !important;
            font-weight: 600 !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 5px 15px rgba(102, 102, 102, 0.3) !important;
          }
        `}
      </style>

      <Card className="recipe-card-insane" onClick={onClick}>
        <CardMedia
          component="img"
          height="200"
          image={recipe.imageUrl || "/placeholder.svg?height=200&width=345"}
          alt={recipe.title}
          className="recipe-media-insane"
        />
        <CardContent className="recipe-content-insane">
          <Typography gutterBottom variant="h6" component="div" className="recipe-title-insane">
            {recipe.title}
          </Typography>

          <Box className="recipe-time-insane">
            <AccessTimeIcon fontSize="small" className="recipe-time-icon-insane" />
            <Typography variant="body2">{recipe.preparationTime} דקות</Typography>
          </Box>

          <Typography variant="body2" className="recipe-description-insane">
            {recipe.instructions.length > 100 ? `${recipe.instructions.substring(0, 100)}...` : recipe.instructions}
          </Typography>

          <Box className="recipe-chips-insane">
            <Chip
              label={`${recipe.ingredients.length} מרכיבים`}
              size="small"
              className="recipe-chip-ingredients-insane"
            />
            {recipe.isPublic !== undefined && (
              <Chip
                label={recipe.isPublic ? "ציבורי" : "פרטי"}
                size="small"
                className={recipe.isPublic ? "recipe-chip-public-insane" : "recipe-chip-private-insane"}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default RecipeCard
