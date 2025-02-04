/**
 * ROUTE FOR TAG
 * @swagger
 * tags:
 *  name: tag
 *  description: Everything about your Tags
 * 
 * 
 */


import express from 'express';
import { addTag, deleteTagByID, getAllTags } from '../DAO/tagDAO';
import swaggerJSDoc from 'swagger-jsdoc';
const router = express.Router();

/**
 * @swagger
 * /api/addTag:
 *   put:
 *     tags: 
 *      - tag
 *     summary: Add a new tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tagName
 *             properties:
 *               tagName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tag added successfully
 */
router.put('/api/addTag', addTag ); 

/**
 * @swagger
 * /api/deleteTagByID:
 *   delete:
 *     tags: 
 *      - tag
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
router.delete('/api/deleteTagByID', deleteTagByID ); 


/**
 * @swagger
 * /api/getAllTags:
 *   get:
 *     tags: 
 *      - tag
 *     summary: Retrieve a list of video
 *     responses:
 *       200:
 *         description: A list of video sorted by like.
 *       400:
 *         description: Could not get Tag List
 */
router.get('/api/getAllTags', getAllTags);



export default router;