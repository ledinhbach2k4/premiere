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
import passport from 'passport';

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

router.post('/auth/google/token', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: "Missing Google token" });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ error: "Invalid Google token" });
        }

        let user = await User.findOne({ googleId: payload.sub });
        if (!user) {
            user = new User({
                googleId: payload.sub,
                username: payload.name,
                email: payload.email
            });
            await user.save();
        }

        // Generate a session or JWT (better for frontend auth)
        const userToken = generateToken(user); // You need a function for this
        res.json({ token: userToken, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

function generateToken(user) {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}


export default router;