import express, { json } from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./routes/user.routes.js"
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js";
import cors from "cors";
import path from "path"

// The dotenv package is used to load environment variables from a .env file into process.env in a Node.js application. 
// Load environment variables from .env file
dotenv.config({})

const app = express()

//api 

// app.get("/home" , (req, res)=>{
//     return res.status(200).json({
//         message:"Coming from  the backend",
//         status:true

//     })
// })

const _dirname= path.resolve();

//middlewares 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

// CORS is a security feature implemented by web browsers to control which resources can be requested from a different origin (domain) than the one that served the web page.

// Specifies which origins are allowed to access resources on the server. In this case, only requests from http://localhost:5173 are permitted. This is useful for restricting access to only specific clients, such as your frontend development server.

// CORS is a security measure to prevent unauthorized websites from making requests to your server.

// You can configure CORS to allow or deny requests from specific origins, and control how credentials are handled.

// During development, CORS allows you to test interactions between a frontend running on one port and a backend running on another.

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*' , (req,res)=>{
    res.sendFile(path.resolve(_dirname, "frontend","dist","index.html"));
})
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    connectDB()
    console.log(`App is runing on port ${PORT} `)
})