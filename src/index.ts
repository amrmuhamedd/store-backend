import express from "express";
import cors from "cors";
import HelloRouter from "./routes/helloRoutes";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/hello", HelloRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
