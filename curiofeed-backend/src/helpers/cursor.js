import crypto, { createHmac, createSecretKey } from "crypto"
import { throwDeprecation } from "process";
import { encode } from "punycode";

function sign(value) {
    return crypto
        .createHmac("sha256", process.env.CURSOR_SECRET)
        .update(value)
        .digest("hex");
}

export function encodeCursor(article){

    const payload = JSON.stringify({
        id:article.id,
        publishedAt:article.publishedAt,
    });

    const encodedPayload = Buffer.from(payload).toString("base64");


    const signature = sing(encodedPayload);

    return `${encodedPayload}.${signature}`;

};

export function decodeCursor(cursor){
    const [encodedPayload,signature] = cursor.split(".");

    const expectedSignature = sign(encodedPayload);

    if(!crypto.timingSafeEqual( Buffer.from(signature),Buffer.from(expectedSignature))){
        throw new Error("Invalid Cursor");
    }

    const payload = Buffer.from(encodedPayload,"base64").toString("utf8");

    return JSON.parse(payload);
                

        
}