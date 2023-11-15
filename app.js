import express from "express"
import HelloRoutes from "./hello.js"
import Lab5 from "./lab5.js"
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL

})); // allow react to connect to server. and only allow 3000 to be called. 
app.use(express.json()); // this is json parsing so the body knows what is passing in.

CourseRoutes(app);
ModuleRoutes(app);


Lab5(app)
HelloRoutes(app)

app.listen(process.env.PORT || 4000);

