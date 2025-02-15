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

import express, {Request, Response, Router} from 'express';
import { getListUser, addUser, deleteAllUser, checkToken  } from '../controller/userDAO';
import swaggerJSDoc from 'swagger-jsdoc';
import passport from 'passport';



const router: Router = express.Router();


/**
 * @swagger
 * /api/auth/google/token:
 *   post:
 *     tags: 
 *      - user
 *     summary: Create a new user
 *     responses:
 *       200:
 *         description: Token is checked.
 */
router.post('/auth/google/token', checkToken);


export default router;