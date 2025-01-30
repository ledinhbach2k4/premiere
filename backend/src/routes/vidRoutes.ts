/**
 * ROUTE FOR VID
 * @swagger
 * tags:
 *  name: VIDEO
 *  description: Everything about your VIDEOS
 * 
 */


import express from 'express';
import { addVid, deleteVidById, getNext10Vid } from '../controller/vidDAO';
import swaggerJSDoc from 'swagger-jsdoc';
const router = express.Router();

/**
 * @swagger
 * /api/addVid:
 *   put:
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
router.put('/api/addVid', addVid ); 

/**
 * @swagger
 * /api/deleteVidByID:
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
router.delete('/api/deleteVidByID', deleteVidById ); 

/**
 * @swagger
 * /api/getNext10Vid:
 *   get:
 *     tags: 
 *      - VIDEO
 *     summary: get next 10 video
 *     parameters:
 *       - in: query
 *         name: index
 *         required: false
 *         description: The starting index for fetching videos. Defaults to 0 if not provided.
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: get next 10 video successfully
 *       400:
 *         description: bad request! video cannot be listed.
 */
router.get('/api/getNext10Vid', getNext10Vid ); 

export default router;