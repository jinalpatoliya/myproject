import express from "express";
import next from "next";
import passport from "passport";
import configurePassport from "./security/passport";
import TaskRouter from "./routes/task";
import UserRouter from "./routes/user";

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

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running http://localhost:${PORT}`);
  });
});
