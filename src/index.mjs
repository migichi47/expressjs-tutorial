import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import routes from "./routes/index.mjs";
// import "./strategies/local-strategy.mjs";
import './strategies/discord-strategies.mjs'

const app = express();

mongoose
  .connect("mongodb://localhost/express_tutorial1")
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "anson the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

app.get("/api/auth/status", (req, res) => {
  console.log(`Inside /auth/status endpoint`);
  console.log(req.user);
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

app.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendDate(400);
    res.send(200);
  });
});

app.get('/api/auth/discord', passport.authenticate('discord'))
app.get('/api/auth/discord/redirect', passport.authenticate('discord'), (req, res) => {
  res.sendStatus(200)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true;
  response.cookie("hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello" });
});



// client_secret = bAy9phvq5XFO7_OW1U4i4NBYhN4mpYJs
//  client_id = 1546715275997483048
// redirect = http://localhost:3000/api/auth/discord/redirect