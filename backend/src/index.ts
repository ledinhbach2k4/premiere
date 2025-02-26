import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swaggerConfig';
import userRoutes from './routes/userRoutes';
import tagRoutes from './routes/tagRoutes';
import vidRoutes from './routes/vidRoutes';
import { connectDB } from './config/DBconnect';
import dotenv from  "dotenv";
import bodyParser from "body-parser";
import cors from "cors";


dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());

//connectDB
connectDB();

// middleware for json data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data
//Cross-Origin Embedder Policy 
/**
 * Nó yêu cầu tất cả tài nguyên được tải về phải hỗ trợ "Cross-Origin Resource Sharing" (CORS) hoặc đến từ cùng một nguồn (same-origin).
 * để cho phép tải canvas -> mp4
 * xuất video hoặc hình ảnh từ canvas, trình duyệt sẽ yêu cầu phải bật chế độ Cross-Origin Isolation 
 */
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

// Middleware to serve Swagger UI
app.use(bodyParser.json());
app.use(express.json({limit: '16mb'}));
app.use(express.urlencoded({limit: '16mb', extended: true}));
app.use(express.static("public"));
// tăng upload file size lên 16mb cho upload video/img

// Register routes  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', userRoutes);
app.use('/', tagRoutes);
app.use('/', vidRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
  