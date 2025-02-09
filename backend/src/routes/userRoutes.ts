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

/**
 * @swagger
 * /api/sign-up:
 *   post:
 *     tags: 
 *      - user
 *     summary: Create a new user
 *     responses:
 *       200:
 *         description: A user is created successfully.
 */
router.post('/sign-up', async (req, res, next) => {
    try {
        addUser(req, res);
    } catch (err){
        return next(err);
    }
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
}
);

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