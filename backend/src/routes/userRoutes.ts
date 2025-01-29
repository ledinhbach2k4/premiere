/**
 * W ROUTE CHO NGƯỜI DÙNG
 * userRoutes.ts SỬ DỤNG ĐỂ DỄ THAO TÁC VÀ QUẢN LÝ BẰNG SWAGGER
 * 
 */

import express from 'express';
import { getListUser, addUser, deleteAllUser  } from '../controller/userDAO';
import swaggerJSDoc from 'swagger-jsdoc';
const router = express.Router();

/**
 * @swagger
 * /getListUsers:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/getListUsers', getListUser ); 


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add user to db
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Add a User.
 */
router.post('/users', addUser);

/**
 * @swagger
 * /deleteAllUsers:
 *   delete:
 *     summary: Delete all users
 *     responses:
 *       200:
 *         description: All users deleted successfully.
 */
router.delete('/deleteAllUsers', deleteAllUser ); // Complete the route for deleting all users


export default router;