import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import path from 'path'
dotenv.config()

const app = express();

app.use(cors({
  origin: 'https://shopsphere-80d1.onrender.com',
  // origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// importing Routes
import productRouter from "./routes/product.routes.js"
import orderRouter from "./routes/order.routes.js"
import userRouter from "./routes/user.routes.js"
import cartRouter from "./routes/cart.routes.js"
import reviewRouter from "./routes/review.routes.js"
import adminRouter from "./routes/admin.routes.js"

app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/review', reviewRouter)
app.use('/api/v1/admin', adminRouter)


app.use((err, req, res, next) => {
  // .error(err.stack); 
  res.status(err.statusCode || 500).json({ error: err.message })
});

// -----------------------------deployment------------------------------------

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  })
} else {
  app.get('/', (req, res) => {
    res.send("API is running :)")
  })
}

// -----------------------------deployment------------------------------------

export { app }