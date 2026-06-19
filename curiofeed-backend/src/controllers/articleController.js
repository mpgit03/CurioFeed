import {getArticles ,getArticleRedirectUrl} from "../services/articleService.js";

export async function getArticlesController(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await getArticles({
            page,
            limit,
        });
        return res.status(200).json({
        success: true,
        data: result,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export async function openArticleController(req, res, next) {
    try {
        const articleId = req.params.id;
        console.log(`Redirecting article ID: ${articleId}`);
        const redirectUrl = await getArticleRedirectUrl(articleId);
        res.redirect(302, redirectUrl);
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Article not found" });
    }
};
