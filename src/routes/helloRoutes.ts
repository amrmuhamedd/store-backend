import express from "express";

import { sayHello } from "../controller/helloController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: hello
 *     description: hello world routes
 */

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Say hello
 *     tags:
 *       - hello
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text:
 *             schema:
 *               type: string
 *               example: 'hello'
 */
router.get("/", sayHello);

export default router;
