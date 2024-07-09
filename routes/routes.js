import app from "../server.js";
import fileRoute from "./fileRoute.js";
import homeRoute from "./homeRoute.js";

app.use("/", homeRoute)
app.use("/file", fileRoute)

export default app  
