import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";
import "dotenv/config";


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'

mongoose.connect(CONNECTION_STRING);
//mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express();
app.use(express.urlencoded({ extended: true }));
const sessionOptions = {
  secret: "some secret",
  saveUninitialized: false,
  resave: false,
};
app.use(
  cors({
    origin: "https://a6--moonlit-malasada-879caa.netlify.app",
    credentials: true,
  })
);
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: "kanbas-node-server-app-a6-lgm0.onrender.com",
  };
}

app.use(session(sessionOptions));
app.use(express.json());
Lab5(app);
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
AssignmentRoutes(app);
app.listen(process.env.PORT || 4000);