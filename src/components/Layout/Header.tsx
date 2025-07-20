"use client"

import type React from "react"
import { useState } from "react"
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import PersonIcon from "@mui/icons-material/Person"
import AddIcon from "@mui/icons-material/Add"
import LoginIcon from "@mui/icons-material/Login"
import AppRegistrationIcon from "@mui/icons-material/AppRegistration"
import HomeIcon from "@mui/icons-material/Home"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAuth } from "../../context/AuthContext"

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null)

  const handleLogout = () => {
    logout()
    navigate("/")
    handleMenuClose()
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMobileMenuAnchorEl(null)
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        "& .MuiPaper-root": {
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          border: "1px solid rgba(255, 167, 38, 0.3)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
        },
        "& .MuiMenuItem-root": {
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          "&:hover": {
            background: "rgba(255, 167, 38, 0.1)",
          },
        },
      }}
    >
      <MenuItem
        onClick={() => {
          navigate("/my-recipes")
          handleMenuClose()
        }}
      >
        <MenuBookIcon fontSize="small" />
        המתכונים שלי
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/create-recipe")
          handleMenuClose()
        }}
      >
        <AddIcon fontSize="small" />
        צור מתכון חדש
      </MenuItem>
      <MenuItem onClick={handleLogout} sx={{ color: "#ff6b6b" }}>
        <LogoutIcon fontSize="small" />
        התנתק
      </MenuItem>
    </Menu>
  )

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMenuAnchorEl}
      open={Boolean(mobileMenuAnchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        "& .MuiPaper-root": {
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          border: "1px solid rgba(255, 167, 38, 0.3)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
        },
        "& .MuiMenuItem-root": {
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          "&:hover": {
            background: "rgba(255, 167, 38, 0.1)",
          },
        },
      }}
    >
      <MenuItem
        onClick={() => {
          navigate("/")
          handleMenuClose()
        }}
      >
        <HomeIcon fontSize="small" />
        דף הבית
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/recipes")
          handleMenuClose()
        }}
      >
        <RestaurantMenuIcon fontSize="small" />
        מתכונים
      </MenuItem>
      {isAuthenticated
        ? [
            <MenuItem
              key="my-recipes"
              onClick={() => {
                navigate("/my-recipes")
                handleMenuClose()
              }}
            >
              <MenuBookIcon fontSize="small" />
              המתכונים שלי
            </MenuItem>,
            <MenuItem
              key="create-recipe"
              onClick={() => {
                navigate("/create-recipe")
                handleMenuClose()
              }}
            >
              <AddIcon fontSize="small" />
              צור מתכון חדש
            </MenuItem>,
            <MenuItem key="logout" onClick={handleLogout} sx={{ color: "#ff6b6b" }}>
              <LogoutIcon fontSize="small" />
              התנתק
            </MenuItem>,
          ]
        : [
            <MenuItem
              key="login"
              onClick={() => {
                navigate("/login")
                handleMenuClose()
              }}
            >
              <LoginIcon fontSize="small" />
              התחבר
            </MenuItem>,
            <MenuItem
              key="register"
              onClick={() => {
                navigate("/register")
                handleMenuClose()
              }}
            >
              <AppRegistrationIcon fontSize="small" />
              הירשם
            </MenuItem>,
          ]}
    </Menu>
  )

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Righteous&family=Exo+2:wght@400;600;700;800;900&display=swap');
          
          .insane-header {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0c29 100%) !important;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5) !important;
            backdrop-filter: blur(10px) !important;
            position: relative !important;
            overflow: hidden !important;
            border-radius: 0 !important;
          }
          
          .insane-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              radial-gradient(circle at 20% 50%, rgba(255, 167, 38, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(255, 107, 107, 0.1) 0%, transparent 50%);
            z-index: 1;
            pointer-events: none;
          }
          
          .insane-header::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              linear-gradient(90deg, transparent 49%, rgba(255, 167, 38, 0.1) 49%, rgba(255, 167, 38, 0.1) 51%, transparent 51%);
            background-size: 50px 50px;
            z-index: 1;
            opacity: 0.3;
            animation: headerGridMove 20s linear infinite;
            pointer-events: none;
          }
          
          @keyframes headerGridMove {
            0% { background-position: 0 0; }
            100% { background-position: 50px 0; }
          }
          
          .insane-logo {
            font-family: 'Righteous', cursive !important;
            font-weight: 900 !important;
            font-size: 1.8rem !important;
            background: linear-gradient(45deg, #ff6b6b, #ffa726, #66bb6a, #42a5f5) !important;
            background-size: 300% 300% !important;
            -webkit-background-clip: text !important;
            background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            text-shadow: 0 0 30px rgba(255, 167, 38, 0.5) !important;
            animation: logoGlow 3s ease-in-out infinite alternate, logoGradientShift 4s ease-in-out infinite !important;
            position: relative !important;
            z-index: 2 !important;
            letter-spacing: 2px !important;
            transform: perspective(500px) rotateX(5deg) !important;
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
          }
          
          @keyframes logoGlow {
            0% { filter: drop-shadow(0 0 10px rgba(255, 167, 38, 0.5)); }
            100% { filter: drop-shadow(0 0 20px rgba(255, 107, 107, 0.7)); }
          }
          
          @keyframes logoGradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .insane-nav-button {
            color: #ffffff !important;
            font-weight: 600 !important;
            position: relative !important;
            z-index: 2 !important;
            transition: all 0.3s ease !important;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3) !important;
            padding: 8px 16px !important;
            margin: 0 4px !important;
            font-family: 'Exo 2', sans-serif !important;
            display: flex !important;
            align-items: center !important;
            gap: 8px !important;
          }
          
          .insane-nav-button:hover {
            background: rgba(255, 167, 38, 0.2) !important;
            box-shadow: 0 0 20px rgba(255, 167, 38, 0.4) !important;
            transform: translateY(-2px) !important;
            text-shadow: 0 0 15px rgba(255, 167, 38, 0.7) !important;
          }
          
          .insane-avatar {
            background: linear-gradient(45deg, #ff6b6b, #ffa726) !important;
            box-shadow: 0 0 20px rgba(255, 167, 38, 0.5) !important;
            border: 2px solid rgba(255, 255, 255, 0.3) !important;
            transition: all 0.3s ease !important;
            position: relative !important;
            z-index: 2 !important;
          }
          
          .insane-avatar:hover {
            transform: scale(1.1) !important;
            box-shadow: 0 0 30px rgba(255, 107, 107, 0.7) !important;
          }
          
          .insane-menu-icon {
            color: #ffffff !important;
            position: relative !important;
            z-index: 2 !important;
            transition: all 0.3s ease !important;
          }
          
          .insane-menu-icon:hover {
            color: #ffa726 !important;
            transform: scale(1.1) !important;
            filter: drop-shadow(0 0 10px rgba(255, 167, 38, 0.7)) !important;
          }
        `}
      </style>

      <AppBar position="static" className="insane-header">
        <Toolbar>
          <IconButton
            component={Link}
            to="/"
            color="inherit"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, position: "relative", zIndex: 2 }}
          >
            <RestaurantMenuIcon sx={{ color: "#ffa726", filter: "drop-shadow(0 0 10px rgba(255, 167, 38, 0.6))" }} />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            className="insane-logo"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            🍳 FlavorFile
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button color="inherit" component={Link} to="/recipes" className="insane-nav-button">
              <RestaurantMenuIcon fontSize="small" />
              מתכונים
            </Button>

            {isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} to="/my-recipes" className="insane-nav-button">
                  <MenuBookIcon fontSize="small" />
                  המתכונים שלי
                </Button>
                <Button color="inherit" component={Link} to="/create-recipe" className="insane-nav-button">
                  <AddIcon fontSize="small" />
                  צור מתכון
                </Button>
                <IconButton edge="end" onClick={handleProfileMenuOpen} color="inherit" className="insane-avatar">
                  <Avatar sx={{ width: 32, height: 32, background: "transparent" }}>
                    <PersonIcon sx={{ color: "#ffffff" }} />
                  </Avatar>
                </IconButton>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login" className="insane-nav-button">
                  <LoginIcon fontSize="small" />
                  התחבר
                </Button>
                <Button color="inherit" component={Link} to="/register" className="insane-nav-button">
                  <AppRegistrationIcon fontSize="small" />
                  הירשם
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Navigation */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleMobileMenuOpen} color="inherit" className="insane-menu-icon">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
        {renderMobileMenu}
        {renderMenu}
      </AppBar>
    </>
  )
}

export default Header
