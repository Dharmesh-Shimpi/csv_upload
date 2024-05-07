import express from "express";
import expressLayouts from "express-ejs-layouts";
import { urlencoded } from "express";
const app = express();
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("views", "views");
app.use(express.static("views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;