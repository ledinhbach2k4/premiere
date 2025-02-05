/**
 * ROUTE FOR VID
 * @swagger
 * tags:
 *  name: VIDEO
 *  description: Everything about your VIDEOS
 * 
 * 
 */


import express from 'express';
import { addVid, deleteVidById, getNext10Vid, get9VidSortByLiked, deleteAllVids, getVidById } from '../DAO/vidDAO';
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
 * /api/deleteAllVids:
 *   delete:
 *     tags: 
 *      - VIDEO
 *     summary: Delete all videos
 *     responses:
 *       200:
 *         description: All videos deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/api/deleteAllVids', deleteAllVids);

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
 *       - in: query
 *         name: tags
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: List of tag IDs to filter videos.
 *     responses:
 *       200:
 *         description: get next 10 video successfully
 *       400:
 *         description: bad request! video cannot be listed.
 */
router.get('/api/getNext10Vid', getNext10Vid ); 



/**
 * @swagger
 * /api/get9VidSortByLiked:
 *   get:
 *     tags: 
 *      - VIDEO
 *     summary: Retrieve a list of video
 *     parameters:
 *       - in: query
 *         name: index
 *         required: false
 *         description: The starting index for fetching videos. Defaults to 0 if not provided.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: tags
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: List of tag IDs to filter videos.
 *     responses:
 *       200:
 *         description: A list of video sorted by like.
 */
router.get('/api/get9VidSortByLiked', get9VidSortByLiked ); 




/**
 * @swagger
 * /api/getVidById:
 *   get:
 *     tags: 
 *      - VIDEO
 *     summary: get video by Id
 *     parameters:
 *      - in: query
 *        name: _id
 *        required: true
 *        schema:
 *          type: string
 *          example: 0
 *     responses:
 *       200:
 *         description: retreive video from Id
 *       500:
 *         description: Server error
 */
router.get('/api/getVidById', getVidById );



export default router;