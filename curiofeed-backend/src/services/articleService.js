import prisma from "../lib/prisma.js";


export async function getArticles({
  page,
  limit,
}) {
    const skip  = (page - 1) * limit;
    const [articles, total] = await prisma.$transaction([
        prisma.article.findMany({
            skip,
            take: limit,
            orderBy: {
                publishedAt: 'desc',
            },
            include: {
                source:{
                    select: {
                        id: true,
                        name: true,
                    },
                },
        }
        }),

        prisma.article.count(),
    ]);

    const formattedArticles = articles.map((article) => ({
        id: article.id,

        title: article.title,

        description: article.description,

        publishedAt: article.publishedAt,

        source: article.source,

        openUrl:`/api/articles/${article.id}/open`,
        }));

        return {
        articles: formattedArticles,

        pagination: {
            page,
            limit,

            total,

            totalPages: Math.ceil(
            total / limit
            ),
        },
        };

    };

export async function getArticleRedirectUrl(articleId) {
    const article = await prisma.article.findUnique({
        where: {
        id: articleId,
        },
        select: {
        url: true,
        },
    });
    console.log("Article found:", article);

    if (!article) {
        const error = new Error("Article not found");
        error.statusCode = 404;
        throw error;
    }

    return article.url;
    }