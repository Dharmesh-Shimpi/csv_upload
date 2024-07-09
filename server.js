import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from 'path';

const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(path.join(path.resolve(), 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
