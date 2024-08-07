const express = require("express");
import { createOrder, getOrders } from "../controller/order";
import ensureAuthenticatedUser from "../middlewares/ensureAuthenticatedUser";
import { validateUserRole } from "../middlewares/ensureRole";
import { UserRolesEnum } from "../types/enums/userRoles.enum";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - products
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: string
 *             description: Product ID

 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: [] # Use the security scheme defined below
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The order was successfully created
 *       400:
 *         description: Bad request
 */
router.post("/", ensureAuthenticatedUser, createOrder);
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: [] # Use the security scheme defined below
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [CREATED]
 *                     default: CREATED
 *                   products:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: Product ID
 *                   user:
 *                     type: string
 *                     description: User ID
 */
router.get(
  "/",
  ensureAuthenticatedUser,
  validateUserRole([UserRolesEnum.SELLER]),
  getOrders
);

export default router;
