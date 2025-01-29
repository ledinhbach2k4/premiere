/**
 * DÙNG ĐỂ TEST
 * 
 */

import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test endpoint
 *     responses:
 *       200:
 *         description: A simple test response.
 */
router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Test route is working!',
    });
});

export default router;