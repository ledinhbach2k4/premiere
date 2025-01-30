import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swaggerConfig';
import userRoutes from './routes/userRoutes';
import tagRoutes from './routes/tagRoutes';
import vidRoutes from './routes/vidRoutes';
import { connectDB } from './config/DBconnect';
import dotenv from  "dotenv";
import bodyParser from "body-parser";


dotenv.config();
const app = express();
const PORT = process.env.PORT;

//connectDB
connectDB();

// Middleware to serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Register routes  
app.use('/', userRoutes);
app.use('/', tagRoutes);
app.use('/',vidRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
  