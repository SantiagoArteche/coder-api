import local from "passport-local";
import passport from "passport";
import jwt from "passport-jwt";
import { createHash, validatePass } from "../utils/bcrypt.js";
import { usersModel } from "../models/users.models.js";
import GithubStrategy from "passport-github2";
import "dotenv/config";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  const cookieExtractor = (request) => {
    console.log(request.cookies.jwtCookie);
    console.log(request.headers.authorization);
    const token = request.headers.authorization
      ? request.headers.authorization
      : {};

    console.log("cookie extractor", token);
    return token;
  };

  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          console.log("JWT", jwt_payload);
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (request, username, password, done) => {
        const { first_name, last_name, email, age } = request.body;

        try {
          const user = await usersModel.findOne({ email: email });

          if (user) {
            return done(null, false);
          }
          const passwordHash = createHash(password);

          const createUser = await usersModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            age: age,
            password: passwordHash,
          });

          return done(null, createUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await usersModel.findOne({ email: username });
          console.log(user);

          if (!user) {
            return done(null, false);
          }

          if (validatePass(password, user.password)) {
            return done(null, user);
          }

          return done(null, false);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET_CLIENT,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await usersModel.findOne({ email: profile._json.email });
          console.log(accessToken);
          console.log(refreshToken);
          console.log(profile);
          if (user) {
            done(null, false);
          } else {
            const userCreated = await usersModel.create({
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              age: 18,
              password: createHash(profile._json.email + profile._json.name),
            });
            done(null, userCreated);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
