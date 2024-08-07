import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swaggerConfig";
import HelloRouter from "./routes/helloRoutes";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/hello", HelloRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
