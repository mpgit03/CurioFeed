import express from 'express';
import { getArticlesController , openArticleController , getArticleByIdController} from '../controllers/articleController.js';
const router = express.Router();

router.get(
    '/',
    getArticlesController,
);

router.get(
    '/:id',
    getArticleByIdController,
);

router.get(
    '/:id/open',
    openArticleController,
);

export default router;  