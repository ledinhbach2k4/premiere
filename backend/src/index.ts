import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swaggerConfig';
import userRoutes from './routes/userRoutes';
import tagRoutes from './routes/tagRoutes';
import vidRoutes from './routes/vidRoutes';
import { connectDB } from './config/DBconnect';
import dotenv from  "dotenv";
import bodyParser from "body-parser";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './model/user';
import cors from "cors";


dotenv.config();
const app = express();
const PORT = process.env.PORT;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

app.use(cors());

//connectDB
connectDB();

//google login
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID || "none", //handle null
  clientSecret: GOOGLE_CLIENT_SECRET || "none",
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback",
},
function(accessToken, refreshToken, profile, cb) {
  User.findOne({ googleId: profile.id })
  .then(user => {
    if (user) {
      return cb(null, user);
    } else {
      const newUser = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails?.[0].value
      });
      newUser.save().then(savedUser => cb(null, savedUser));
    }
  })
  .catch(err => cb(err));
  }
));

//Cross-Origin Embedder Policy 
/**
 * Nó yêu cầu tất cả tài nguyên được tải về phải hỗ trợ "Cross-Origin Resource Sharing" (CORS) hoặc đến từ cùng một nguồn (same-origin).
 * để cho phép tải canvas -> mp4
 * xuất video hoặc hình ảnh từ canvas, trình duyệt sẽ yêu cầu phải bật chế độ Cross-Origin Isolation 
 */
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Middleware to serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Register routes  
app.use('/', userRoutes);
app.use('/', tagRoutes);
app.use('/', vidRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
  