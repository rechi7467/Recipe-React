import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { AuthProvider } from "./context/AuthContext"
import Header from "./components/Layout/Header"
import LandingPage from "./pages/LandingPage"
import LoginForm from "./components/Auth/LoginForm"
import RegisterForm from "./components/Auth/RegisterForm"
import PublicRecipesPage from "./pages/PublicRecipesPage"
import MyRecipesPage from "./pages/MyRecipesPage"
import CreateRecipePage from "./pages/CreateRecipePage"
import RecipeDetailPage from "./pages/RecipeDetailPage"

// ערכת צבעים חדשה ויפה
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#FF5722", // כתום חם במקום ירוק
      light: "#FF8A65",
      dark: "#E64A19",
    },
    secondary: {
      main: "#2196F3", // כחול יפה
      light: "#64B5F6",
      dark: "#1976D2",
    },
    background: {
      default: "#FAFAFA", // רקע אפור בהיר
      paper: "#FFFFFF",
    },
    success: {
      main: "#4CAF50",
    },
    warning: {
      main: "#FF9800",
    },
  },
  typography: {
    fontFamily: "'Rubik', 'Roboto', 'Helvetica', 'Arial', sans-serif", // הפונט החדש
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none', // בלי אותיות גדולות
    },
  },
  shape: {
    borderRadius: 12, // פינות מעוגלות יותר
  },
  components: {
    // עיצוב כפתורים
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '10px 20px',
          fontSize: '1rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    // עיצוב כרטיסים
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 20px rgba(0,0,0,0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 8px 30px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    // עיצוב נייר
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/recipes" element={<PublicRecipesPage />} />
            <Route path="/my-recipes" element={<MyRecipesPage />} />
            <Route path="/create-recipe" element={<CreateRecipePage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App


