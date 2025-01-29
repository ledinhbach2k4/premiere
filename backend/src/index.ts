import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swaggerConfig';
import userRoutes from './routes/userRoutes';
import testRouter from './routes/testRoutes'
import { connectDB } from './config/DBconnect';
import dotenv from  "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//connectDB
connectDB();

// Middleware to serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Register routes  
app.use('/', userRoutes);
app.use('/', testRouter); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
  