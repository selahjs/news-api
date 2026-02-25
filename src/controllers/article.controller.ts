import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendResponse } from '../utils/response.js';
import { ArticleService } from '../services/article.service.js';

const prisma = new PrismaClient();

export const createArticle = async (req: any, res: Response) => {
    try {
        const article = await prisma.article.create({
            data: {
                ...req.body,
                authorId: req.user.sub // from JWT
            }
        });
        return sendResponse(res, 201, { success: true, message: "Article created", object: article });
    } catch (error: any) {
        return sendResponse(res, 400, { success: false, message: "Validation failed", errors: [error.message] });
    }
};

export const getPublicArticles = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    
    const { articles, total } = await ArticleService.getPublic({
      category: req.query.category as string,
      author: req.query.author as string,
      q: req.query.q as string,
      page,
      size
    });

    return res.status(200).json({
      Success: true,
      Message: "Articles retrieved",
      Object: articles,
      PageNumber: page,
      PageSize: size,
      TotalSize: total,
      Errors: null
    });
  } catch (error: any) {
    return sendResponse(res, 500, { success: false, message: "Error fetching articles", errors: [error.message] });
  }
};
// export const getPublicArticles = async (req: Request, res: Response) => {
//     const { category, author, q, page = 1, size = 10 } = req.query;
//     const skip = (Number(page) - 1) * Number(size);

//     const where = {
//         status: 'Published' as any,
//         deletedAt: null, // GLOBAL REQUIREMENT: Ignore soft-deleted
//         ...(category && { category: String(category) }),
//         ...(author && { author: { name: { contains: String(author), mode: 'insensitive' } } }),
//         ...(q && { OR: [
//             { title: { contains: String(q), mode: 'insensitive' } },
//             { content: { contains: String(q), mode: 'insensitive' } }
//         ]})
//     };

//     const [articles, total] = await Promise.all([
//         prisma.article.findMany({ where, skip, take: Number(size), include: { author: { select: { name: true } } } }),
//         prisma.article.count({ where })
//     ]);

//     return res.status(200).json({
//         Success: true,
//         Message: "Articles retrieved",
//         Object: articles,
//         PageNumber: Number(page),
//         PageSize: Number(size),
//         TotalSize: total,
//         Errors: null
//     });
// };