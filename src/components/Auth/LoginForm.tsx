"use client"

import type React from "react"
import { useState } from "react"
import { Container, Paper, TextField, Button, Typography, Box, Alert, CircularProgress } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import { authAPI } from "../../services/api"
import { useAuth } from "../../context/AuthContext"
import type { LoginDTO } from "../../types"

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>()

  const onSubmit = async (data: LoginDTO) => {
    setLoading(true)
    setError("")

    try {
      const response = await authAPI.login(data)
      login(response.data.token)
      navigate("/recipes")
    } catch (err: any) {
      setError(err.response?.data?.message || "שגיאה בהתחברות")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Rubik:wght@400;500;600;700;800&display=swap');
          
          .login-universe {
            background: radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
          }
          
          .login-universe::before {
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
          
          .login-paper-3d {
            background: rgba(26, 26, 46, 0.9) !important;
            backdrop-filter: blur(20px) !important;
            border-radius: 25px !important;
            border: 1px solid rgba(255, 107, 53, 0.3) !important;
            box-shadow: 
              0 25px 50px rgba(0, 0, 0, 0.3),
              0 0 40px rgba(255, 107, 53, 0.2) !important;
            overflow: hidden !important;
            transform: perspective(1000px) rotateX(5deg) !important;
            transition: all 0.4s ease !important;
            position: relative !important;
            z-index: 2 !important;
          }
          
          .login-paper-3d::before {
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
          
          .login-paper-3d:hover {
            transform: perspective(1000px) rotateX(0deg) translateY(-8px) !important;
            box-shadow: 
              0 35px 70px rgba(0, 0, 0, 0.4),
              0 0 50px rgba(255, 107, 53, 0.3) !important;
          }
          
          .login-content-3d {
            padding: 50px !important;
            position: relative !important;
            z-index: 2 !important;
          }
          
          .login-title-3d {
            font-family: 'Montserrat', sans-serif !important;
            font-weight: 800 !important;
            color: #ffffff !important;
            text-shadow: 0 0 20px rgba(255, 107, 53, 0.7) !important;
            text-align: center !important;
            margin-bottom: 40px !important;
          }
          
          .login-field-3d .MuiOutlinedInput-root {
            background: rgba(255, 255, 255, 0.05) !important;
            border-radius: 15px !important;
            transition: all 0.3s ease !important;
            color: #ffffff !important;
          }
          
          .login-field-3d .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
            border: 2px solid rgba(255, 107, 53, 0.3) !important;
            transition: all 0.3s ease !important;
          }
          
          .login-field-3d .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
            border-color: rgba(255, 107, 53, 0.6) !important;
            box-shadow: 0 0 20px rgba(255, 107, 53, 0.2) !important;
          }
          
          .login-field-3d .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: #ff6b35 !important;
            border-width: 2px !important;
            box-shadow: 0 0 25px rgba(255, 107, 53, 0.4) !important;
          }
          
          .login-field-3d .MuiInputLabel-root {
            color: rgba(255, 255, 255, 0.7) !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 500 !important;
          }
          
          .login-field-3d .MuiInputLabel-root.Mui-focused {
            color: #ff6b35 !important;
          }
          
          .login-field-3d input {
            color: #ffffff !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 400 !important;
          }
          
          .login-button-3d {
            background: linear-gradient(45deg, #ff6b35, #ffa500) !important;
            color: #ffffff !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 700 !important;
            font-size: 1.1rem !important;
            padding: 15px 40px !important;
            border-radius: 50px !important;
            border: none !important;
            box-shadow: 
              0 10px 30px rgba(0, 0, 0, 0.3),
              0 0 20px rgba(255, 107, 53, 0.4) !important;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            text-transform: none !important;
            width: 100% !important;
            margin-top: 30px !important;
            position: relative !important;
            overflow: hidden !important;
          }
          
          .login-button-3d::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.7s ease;
          }
          
          .login-button-3d:hover {
            transform: translateY(-5px) scale(1.02) !important;
            box-shadow: 
              0 15px 40px rgba(0, 0, 0, 0.4),
              0 0 30px rgba(255, 107, 53, 0.6) !important;
          }
          
          .login-button-3d:hover::before {
            left: 100%;
          }
          
          .login-link-3d {
            color: #ffa500 !important;
            text-decoration: none !important;
            font-family: 'Rubik', sans-serif !important;
            font-weight: 600 !important;
            transition: all 0.3s ease !important;
          }
          
          .login-link-3d:hover {
            color: #ff6b35 !important;
            text-shadow: 0 0 10px rgba(255, 107, 53, 0.5) !important;
          }
          
          @media (max-width: 768px) {
            .login-paper-3d {
              transform: none !important;
              margin: 20px !important;
            }
            
            .login-content-3d {
              padding: 30px !important;
            }
          }
        `}
      </style>

      <div className="login-universe">
        <Container maxWidth="sm">
          <Paper elevation={3} className="login-paper-3d">
            <div className="login-content-3d">
              <Typography variant="h4" component="h1" className="login-title-3d">
                🔑 התחברות
              </Typography>

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
                  position: "relative",
                  zIndex: 2,
                  "& .MuiAlert-icon": {
                    color: "#dc3545",
                  },
                }}
              >
                {error}
              </Alert>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="שם משתמש או אימייל"
                  margin="normal"
                  className="login-field-3d"
                  {...register("usernameOrEmail", { required: "שדה חובה" })}
                  error={!!errors.usernameOrEmail}
                  helperText={errors.usernameOrEmail?.message}
                />

                <TextField
                  fullWidth
                  label="סיסמה"
                  type="password"
                  margin="normal"
                  className="login-field-3d"
                  {...register("password", { required: "שדה חובה" })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <Button type="submit" fullWidth variant="contained" className="login-button-3d" disabled={loading}>
                  {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "התחבר"}
                </Button>

                <Box textAlign="center" sx={{ mt: 4, position: "relative", zIndex: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.8)", fontFamily: "Rubik, sans-serif" }}
                  >
                    אין לך חשבון?{" "}
                    <Link to="/register" className="login-link-3d">
                      הירשם כאן
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </div>
          </Paper>
        </Container>
      </div>
    </>
  )
}

export default LoginForm
