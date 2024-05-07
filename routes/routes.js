import app from "../index.js";
import fileRoute from "./fileRoute.js";
import homeRoute from "./homeRoute.js";

app.use("/home", homeRoute)
app.use("/file", fileRoute)

export default app  