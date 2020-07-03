import express from "express";
import next from "next";
import passport from "passport";
import configurePassport from "./security/passport";
import TaskRouter from "./routes/task";
import UserRouter from "./routes/user";
import CategoryRouter from "./routes/category";
import SubcategoryRouter from "./routes/subcategory";
import QuestionRouter from "./routes/question";
import CommentRouter from "./routes/comment";
import MaincategoryRouter from "./routes/maincategory"
// import bodyParser from 'body-parser'

require('dotenv').config();


// Envirment is development or production
const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => { 
  const server = express();
  server.use(express.json());

  // it initialize passport and configure it
  server.use(passport.initialize());
  configurePassport(passport);
  server.use("/api/v1/task", TaskRouter);
  server.use("/api/v1/user", UserRouter);
  server.use("/api/v1/category",CategoryRouter);
  server.use("/api/v1/subcategory",SubcategoryRouter);
  server.use("/api/v1/question",QuestionRouter);    
  server.use("/api/v1/comment",CommentRouter);
  server.use("/api/v1/maincategory",MaincategoryRouter)
  
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running http://localhost:${PORT}`);
  });
});
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
