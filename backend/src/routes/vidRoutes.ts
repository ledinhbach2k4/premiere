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
import { addVid, deleteVidById, getNext10Vid, get9VidSortByLiked, deleteAllVids, getVidById } from '../controller/vidDAO';
import swaggerJSDoc from 'swagger-jsdoc';
import multer from 'multer';
import crypto from 'crypto';
import env from 'dotenv';
env.config();

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

const upload = multer({storage: multer.memoryStorage(),
    limits: {
        fileSize: 16 * 1024 * 1024, // 16MB
    },
})
const algorithm = "aes-256-cbc";
const SECRET_KEY = Buffer.from(
  process.env.SECRET_FILE_ENCRYPTION_KEY ||
    "25f2bb2f199d24475c2c57966dbb3be9a9ac3d6ac709bc0ca38de4b69677a3a9",
  "hex"
);
if (SECRET_KEY.length !== 32) {
  throw new Error(
    "Secret key must be 32 bytes (AES-256 requires 256-bit key)."
  );
}

const encryptImage = (buffer: any) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, SECRET_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return { 
    iv: iv.toString("hex"), 
    data: encrypted.toString("hex") 
  };
}
import Template from '../model/vid';
router.post('/upload', upload.single('thumbnail'), async (req, res) => {
    try {
        console.log("File Received:", req.file); // Debugging line
        console.log("Request Body:", req.body);

        const { title, likeNum, releaseDate } = req.body;
        if (!req.file){
            res.status(400).json({
                message: "No file uploaded",
            })
        }

        const encrypted = encryptImage(req?.file?.buffer);
        const template = new Template({
            title,
            likeNum,
            thumbnail: Buffer.from(JSON.stringify(encrypted)),
        })
        await template
          .save()
          .then(() => console.log("Saved to MongoDB:", template))
          .catch((err) => console.error("MongoDB Save Error:", err));

        res.status(201).json({
            message: "File uploaded successfully",
        })
    } catch (error) {
        res.status(500).json({
            error: error,
        })
    }
})

export default router;