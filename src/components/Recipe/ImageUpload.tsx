// "use client"

// import type React from "react"
// import { useState, useRef } from "react"
// import { Box, Button, Typography, IconButton, Alert } from "@mui/material"
// import CloudUploadIcon from "@mui/icons-material/CloudUpload"
// import DeleteIcon from "@mui/icons-material/Delete"
// import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"

// interface ImageUploadProps {
//   onImageSelect: (file: File | null) => void
//   currentImage?: string
//   maxSize?: number // in MB
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, currentImage, maxSize = 5 }) => {
//   const [preview, setPreview] = useState<string | null>(currentImage || null)
//   const [error, setError] = useState<string>("")
//   const [dragOver, setDragOver] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleFileSelect = (file: File) => {
//     setError("")

//     // Check file type
//     if (!file.type.startsWith("image/")) {
//       setError("אנא בחר קובץ תמונה בלבד")
//       return
//     }

//     // Check file size
//     if (file.size > maxSize * 1024 * 1024) {
//       setError(`גודל הקובץ חייב להיות קטן מ-${maxSize}MB`)
//       return
//     }

//     // Create preview
//     const reader = new FileReader()
//     reader.onload = (e) => {
//       setPreview(e.target?.result as string)
//     }
//     reader.readAsDataURL(file)

//     onImageSelect(file)
//   }

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       handleFileSelect(file)
//     }
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     setDragOver(false)

//     const file = e.dataTransfer.files[0]
//     if (file) {
//       handleFileSelect(file)
//     }
//   }

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault()
//     setDragOver(true)
//   }

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault()
//     setDragOver(false)
//   }

//   const handleRemoveImage = () => {
//     setPreview(null)
//     setError("")
//     onImageSelect(null)
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   const handleButtonClick = () => {
//     fileInputRef.current?.click()
//   }

//   return (
//     <>
//       <style>
//         {`
//           .image-upload-3d {
//             background: rgba(26, 26, 46, 0.9);
//             backdrop-filter: blur(20px);
//             border-radius: 20px;
//             border: 2px dashed rgba(255, 107, 53, 0.3);
//             box-shadow: 
//               0 15px 35px rgba(0, 0, 0, 0.3),
//               0 0 25px rgba(255, 107, 53, 0.2);
//             padding: 30px;
//             text-align: center;
//             transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//             position: relative;
//             overflow: hidden;
//             min-height: 200px;
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//           }
          
//           .image-upload-3d::before {
//             content: '';
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: 
//               repeating-linear-gradient(
//                 45deg,
//                 transparent,
//                 transparent 3px,
//                 rgba(255, 107, 53, 0.02) 3px,
//                 rgba(255, 107, 53, 0.02) 6px
//               );
//             animation: patternMove 6s linear infinite;
//             pointer-events: none;
//           }
          
//           @keyframes patternMove {
//             0% { background-position: 0 0; }
//             100% { background-position: 20px 20px; }
//           }
          
//           .image-upload-3d.drag-over {
//             border-color: #ff6b35;
//             background: rgba(255, 107, 53, 0.1);
//             transform: scale(1.02);
//             box-shadow: 
//               0 20px 45px rgba(0, 0, 0, 0.4),
//               0 0 35px rgba(255, 107, 53, 0.4);
//           }
          
//           .image-upload-3d:hover {
//             border-color: rgba(255, 107, 53, 0.6);
//             transform: translateY(-3px);
//             box-shadow: 
//               0 20px 45px rgba(0, 0, 0, 0.4),
//               0 0 35px rgba(255, 107, 53, 0.3);
//           }
          
//           .upload-content-3d {
//             position: relative;
//             z-index: 2;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 20px;
//           }
          
//           .upload-icon-3d {
//             color: #ff6b35;
//             filter: drop-shadow(0 0 15px rgba(255, 107, 53, 0.5));
//             animation: iconFloat 3s ease-in-out infinite;
//           }
          
//           @keyframes iconFloat {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-8px); }
//           }
          
//           .upload-text-3d {
//             color: rgba(255, 255, 255, 0.9);
//             font-family: 'Rubik', sans-serif;
//             font-weight: 600;
//             text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
//           }
          
//           .upload-subtext-3d {
//             color: rgba(255, 255, 255, 0.6);
//             font-family: 'Rubik', sans-serif;
//             font-weight: 400;
//             font-size: 0.9rem;
//           }
          
//           .upload-button-3d {
//             background: linear-gradient(45deg, #ff6b35, #ffa500);
//             color: #ffffff;
//             font-family: 'Rubik', sans-serif;
//             font-weight: 600;
//             padding: 12px 25px;
//             border-radius: 50px;
//             border: none;
//             box-shadow: 
//               0 8px 25px rgba(0, 0, 0, 0.3),
//               0 0 15px rgba(255, 107, 53, 0.4);
//             transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//             text-transform: none;
//             display: flex;
//             align-items: center;
//             gap: 8px;
//           }
          
//           .upload-button-3d:hover {
//             transform: translateY(-3px) scale(1.05);
//             box-shadow: 
//               0 12px 35px rgba(0, 0, 0, 0.4),
//               0 0 25px rgba(255, 107, 53, 0.6);
//           }
          
//           .preview-container-3d {
//             position: relative;
//             width: 100%;
//             max-width: 400px;
//             border-radius: 15px;
//             overflow: hidden;
//             box-shadow: 
//               0 15px 35px rgba(0, 0, 0, 0.3),
//               0 0 25px rgba(255, 107, 53, 0.2);
//             background: rgba(255, 255, 255, 0.05);
//             backdrop-filter: blur(10px);
//           }
          
//           .preview-image-3d {
//             width: 100%;
//             height: 250px;
//             object-fit: cover;
//             border-radius: 15px;
//             transition: all 0.3s ease;
//           }
          
//           .preview-image-3d:hover {
//             transform: scale(1.02);
//           }
          
//           .preview-overlay-3d {
//             position: absolute;
//             top: 10px;
//             right: 10px;
//             background: rgba(220, 53, 69, 0.9);
//             backdrop-filter: blur(10px);
//             border-radius: 50%;
//             padding: 8px;
//             transition: all 0.3s ease;
//           }
          
//           .preview-overlay-3d:hover {
//             background: rgba(220, 53, 69, 1);
//             transform: scale(1.1);
//             box-shadow: 0 0 15px rgba(220, 53, 69, 0.6);
//           }
          
//           .hidden-input {
//             display: none;
//           }
//         `}
//       </style>

//       <Box>
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           onChange={handleFileInputChange}
//           className="hidden-input"
//         />

//         {error && (
//           <Alert
//             severity="error"
//             sx={{
//               mb: 2,
//               borderRadius: "15px",
//               background: "rgba(26, 26, 46, 0.9)",
//               backdropFilter: "blur(15px)",
//               border: "2px solid #dc3545",
//               color: "#ffffff",
//               "& .MuiAlert-icon": {
//                 color: "#dc3545",
//               },
//             }}
//           >
//             {error}
//           </Alert>
//         )}

//         {preview ? (
//           <div className="preview-container-3d">
//             <img src={preview || "/placeholder.svg"} alt="תצוגה מקדימה" className="preview-image-3d" />
//             <IconButton className="preview-overlay-3d" onClick={handleRemoveImage} size="small">
//               <DeleteIcon sx={{ color: "#ffffff" }} />
//             </IconButton>
//           </div>
//         ) : (
//           <div
//             className={`image-upload-3d ${dragOver ? "drag-over" : ""}`}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//             onDragLeave={handleDragLeave}
//           >
//             <div className="upload-content-3d">
//               <CloudUploadIcon className="upload-icon-3d" sx={{ fontSize: 60 }} />

//               <Typography variant="h6" className="upload-text-3d">
//                 📸 העלה תמונה למתכון
//               </Typography>

//               <Typography variant="body2" className="upload-subtext-3d">
//                 גרור ושחרר תמונה כאן או לחץ לבחירה
//               </Typography>

//               <Typography variant="caption" className="upload-subtext-3d">
//                 תמונות עד {maxSize}MB | JPG, PNG, GIF
//               </Typography>

//               <Button className="upload-button-3d" onClick={handleButtonClick}>
//                 <PhotoCameraIcon />
//                 בחר תמונה
//               </Button>
//             </div>
//           </div>
//         )}
//       </Box>
//     </>
//   )
// }

// export default ImageUpload
