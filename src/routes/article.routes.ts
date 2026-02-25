import { Router } from 'express';
import * as ArticleController from '../controllers/article.controller';
import { authorize } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', ArticleController.getPublicArticles);
// router.get('/:id', ArticleController.getArticleById);

// Author-only routes
router.post('/', authorize(['author']), ArticleController.createArticle);
// router.delete('/:id', authorize(['author']), ArticleController.deleteArticle);

export default router;