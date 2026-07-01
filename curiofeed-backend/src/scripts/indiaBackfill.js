

import prisma from "../lib/prisma.js";
import {generateWithRetry,extractJson} from "../services/classificationService.js"


async function classifyIndian(articles) {
    const prompt = 
    `You are an expert news classification system.

    Your task is to determine whether each article is primarily related to India.

    Classification Rules:

    - Set "isIndiaRelated" to true ONLY if the article is primarily about India.
    - This includes:
    - Indian government, politics, or public policy
    - Indian companies or startups
    - Indian economy or financial markets
    - Technology, science, or business developments centered on India
    - Events occurring in India
    - People, organizations, or institutions whose primary context is India

    Set "isIndiaRelated" to false if:

    - India is mentioned only briefly.
    - India is one of many countries discussed.
    - The article is about a global topic without a primary focus on India.
    - The connection to India is weak or incidental.

    Return ONLY valid JSON.

    Output format:

    [
    {
        "articleId": "string",
        "isIndiaRelated": true
    }
    ]

    Articles:

    ${JSON.stringify(articles)}`;

    const classification  = await generateWithRetry(prompt);

    return extractJson(classification.text);
}


async function persistIndiaRelated (response) {


    for(const article of response){
       await prisma.article.update({
        where:{
            id:article.articleId,
        },
        data:{
            isIndiaRelated:article.isIndiaRelated,
        },
       });

    };


    return ({
        success:true,
        indianClassified:response.length,
    });


}


let skip = 0;

try{
    let batch=1;
    let skip=0;
    while (true) {
    const articles = await prisma.article.findMany({
    where: {
        topicsClassified: true,
    },
    select: {
        id: true,
        title: true,
        description: true,
    },
    skip,
    take: 20,
    });

    if (articles.length === 0) break;

    const start =  Date.now();
    const response  = await classifyIndian(articles);

    const responseTime = Date.now() - start;
    console.log({
        classified: response.length,
        responseTime,
    });

    await persistIndiaRelated(response);

    console.log(
    `Batch ${batch}: Updated ${response.length} articles`
    );

    batch++;


    skip += articles.length;
}

console.log("India backfill completed successfully.");

}catch (error) {

    console.log("Failed article:");
    console.dir(article, { depth: null });
    throw error;


}



