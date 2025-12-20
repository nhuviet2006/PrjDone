import path from "path";
import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from "dotenv";
import cors from "cors";


// Import Routes
import eventRoutes from './routes/eventRoutes';
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tài liệu API Dự án (Team 4)',
      version: '1.0.0',
      description: 'API Document tự động',
    },
    servers: [
      { url: 'http://localhost:3000' } 
    ],
    components: {
      securitySchemes: {
        bearerAuth: { // Kiểu xác thực JWT
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }], 
  },
  apis: [path.join(__dirname, './routes/*.ts')], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cors());
// Routes
app.use("/api/auth", authRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/users", userRoutes);

// Error Handling (Luôn để cuối cùng)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger Docs at http://localhost:${PORT}/api-docs`);
});
