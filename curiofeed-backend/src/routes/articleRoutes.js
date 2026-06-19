import express from 'express';
import {getArticlesController,openArticleController} from '../controllers/articleController.js';
const router = express.Router();

router.get(
    '/',
    getArticlesController,
)

router.get(
    '/:id/open',
    openArticleController,
);

export default router;  