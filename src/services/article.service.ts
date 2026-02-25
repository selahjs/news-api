
import { Prisma, PrismaClient, Status } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

export class ArticleService {
    static async getPublic(query: { category?: string; author?: string; q?: string; page: number; size: number }) {
    const { category, author, q, page, size } = query;
    const skip = (page - 1) * size;

    // We define the type explicitly to fix the TS error
    const where: Prisma.ArticleWhereInput = {
      status: Status.Published,
      deletedAt: null,
      ...(category && { category }),
      ...(author && { author: { name: { contains: author, mode: 'insensitive' } } }),
      ...(q && {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } },
        ],
      }),
    };

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: size,
        include: { author: { select: { name: true } } },
      }),
      prisma.article.count({ where }),
    ]);

    return { articles, total };
  }
  static async create(data: any, authorId: string) {
    return await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        status: data.status || Status.Draft,
        authorId: authorId,
      },
    });
  }

  static async softDelete(id: string, authorId: string) {
    const article = await prisma.article.findUnique({ where: { id } });
    
    if (!article) throw new Error("Not Found");
    if (article.authorId !== authorId) throw new Error("Forbidden");

    return await prisma.article.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}