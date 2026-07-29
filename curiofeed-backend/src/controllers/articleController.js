import { getArticles , getArticleRedirectUrl , getArticleById} from "../services/articleService.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { serviceLogger } from "../lib/logger.js";



export const  getArticlesController = asyncHandler( async(req, res) => {
    
        const { page , limit } = req.validated.query;
        console.log(req.validated);
        const result = await getArticles({
            page,
            limit,
        });
        return res.status(200).json({
        success: true,
        data: result,
        });

});


export const getArticleByIdController = asyncHandler( async(req, res) => {
   
        const {articleId} = req.validated.params; 
        console.log(req.validated);   
        
        const article = await getArticleById(articleId);
        return res.status(200).json({
            success: true,
            data: article,
        });
   
});


export const openArticleController = asyncHandler( async(req, res) => {
    
        const {articleId} = req.validated.params;
        const redirectUrl = await getArticleRedirectUrl(articleId);
        res.redirect(302, redirectUrl);
    
});




