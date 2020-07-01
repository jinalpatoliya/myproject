import passport from "passport";
import passportJWT from "passport-jwt";
import { UserModel } from "../db/index";
import passportConfig from "../config/passport.config.json";

const Strategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const params = {
  secretOrKey: passportConfig.secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const configurePassport = (passport) => {
  passport.use(
    new Strategy(params, (payload, done) => {
      console.log("-----------------");
      console.log(payload);
      console.log("-----------------");
      UserModel.findByPk(payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};

export const authenticate = () => {
  return passport.authenticate("jwt", { session: false });
};

export default configurePassport;
