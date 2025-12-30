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
import adminRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/event.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sl.html'));
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tài liệu API Dự án',
      version: '1.0.0',
      description: 'API Document tự động',
    },
    servers: [
      { url: 'http://localhost:3000' } 
    ],
    components: {
      securitySchemes: {
        bearerAuth: { 
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }], 
  },
  apis: [path.join(__dirname, './routes/*{.ts,.js}')], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// Routes
app.use("/api/auth", authRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Error Handling (Luôn để cuối cùng)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger Docs at http://localhost:${PORT}/api-docs`);
});
