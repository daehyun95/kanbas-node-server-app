import express from "express"
import HelloRoutes from "./hello.js"
import Lab5 from "./lab5.js"
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
import AssignmentRoutes from "./assignments/routes.js";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas-cs5610-fa23");
import UserRoutes from "./users/routes.js";
import seeson from "express-session";

const app = express();
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
   );
   
app.use(express.json()); 

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);


Lab5(app)
HelloRoutes(app)

app.listen(process.env.PORT || 4000);

