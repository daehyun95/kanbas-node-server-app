import express from "express"
import HelloRoutes from "./hello.js"
import Lab5 from "./lab5.js"
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";

const app = express()
app.use(cors());
app.use(express.json());
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL
    }));  

CourseRoutes(app);
ModuleRoutes(app);



Lab5(app)
HelloRoutes(app)

app.listen(process.env.PORT || 4000);

