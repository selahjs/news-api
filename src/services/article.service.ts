import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

export class ArticleService {
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