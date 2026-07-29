import express from 'express';
import { validate } from '../middleware/validate.js';
import { getArticleByIdSchema,getarticleSchema } from '../validators/articleValidator.js';
import { getArticlesController , openArticleController , getArticleByIdController} from '../controllers/articleController.js';
const router = express.Router();

router.get(
    '/',
    validate(getarticleSchema),
    getArticlesController,
);

router.get(
    '/:articleId',
    validate(getArticleByIdSchema),
    getArticleByIdController,
);

router.get(
    '/:articleId/open',
    validate(getArticleByIdSchema),
    openArticleController,
);

export default router;  