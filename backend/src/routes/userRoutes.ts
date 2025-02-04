/**
 * ROUTE CHO NGƯỜI DÙNG
 * userRoutes.ts SỬ DỤNG ĐỂ DỄ THAO TÁC VÀ QUẢN LÝ BẰNG SWAGGER
 * 
 * @swagger
 * tags:
 *  name: user
 *  description: Everything about your User
 * 
 * 
 */

import express from 'express';
import { getListUser, addUser, deleteAllUser  } from '../DAO/userDAO';
import swaggerJSDoc from 'swagger-jsdoc';
const router = express.Router();

/**
 * @swagger
 * /api/getListUsers:
 *   get:
 *     tags: 
 *      - user
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/api/getListUsers', getListUser ); 


/**
 * @swagger
 * /api/addUsers:
 *   put:
 *     tags: 
 *      - user
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
router.put('/api/addUsers', addUser);

/**
 * @swagger
 * /api/deleteAllUsers:
 *   delete:
 *     tags: 
 *      - user
 *     summary: Delete all users
 *     responses:
 *       200:
 *         description: All users deleted successfully.
 */
router.delete('/api/deleteAllUsers', deleteAllUser ); // Complete the route for deleting all users


export default router;