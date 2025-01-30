/**
 * ROUTE FOR VID
 * @swagger
 * tags:
 *  name: VIDEO
 *  description: Everything about your VIDEOS
 * 
 */


import express from 'express';
import { addVid, deleteVidById } from '../controller/vidDAO';
import swaggerJSDoc from 'swagger-jsdoc';
const router = express.Router();

/**
 * @swagger
 * /addVid:
 *   post:
 *     tags: 
 *      - VIDEO
 *     summary: Add a new Video
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *               - tags
 * 
 *             properties:
 *               title:
 *                 type: string
 *               url:
 *                 type: string
 *               tags:
 *                 type: [string]
 * 
 *     responses:
 *       201:
 *         description: new video added successfully
 *       400:
 *         description: bad request! video cannot be added.
 */
router.post('/addVid', addVid ); 

/**
 * @swagger
 * /deleteVid   ByID:
 *   delete:
 *     tags: 
 *      - VIDEO
 *     summary: Add a new tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - _id
 *             properties:
 *               _id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tag added successfully
 */
router.delete('/deleteVidByID', deleteVidById ); 

export default router;