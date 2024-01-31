import express from "express";
import mongoose from "mongoose";
import { __dirname } from "./path.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.js";
import { router } from "./routes/index.routes.js";
import cors from "cors";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const whiteList = ["http://localhost:4000", "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso denegado"));
    }
  },
};
const PORT = 4000;

const app = express();

// BDD
mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("BD conectada");
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server on PORT ${PORT}`);
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser(process.env.SIGNED_COOKIE)); // cookie firmada

// Almacenar session en la base de datos
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 60,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Middlewares passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
// middleware de autorizacion para usar la app como administrador

// Routes
const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentacion Curso Backend Coderhouse",
      description: "API Coder Backend",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);

app.use("/", router);

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
