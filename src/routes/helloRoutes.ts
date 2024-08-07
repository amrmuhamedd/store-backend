import express from "express";

import { sayHello } from "../controller/helloController";

const router = express.Router();

router.get("/", sayHello);

export default router;
