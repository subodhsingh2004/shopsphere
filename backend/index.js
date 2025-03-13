import { app } from "./app.js";
import connectDB from "./db/index.js";

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server is running")
        })
    })
    .catch((error) => {
        console.log("monogodb connection failed", error)
    })