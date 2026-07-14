import dotenv from "dotenv";
dotenv.config();
import Imagekit from "imagekit";

const storageInstance = new Imagekit({
    pub_key: process.env.PUB_KEY,
    priv_key: process.env.PRI_KEY,
    urlEndpoint: process.env.URL,
});

export const sendFile = async (file, fileName) => {
    let obj = {
        file,
        fileName,
        folder: "instaClone",
    };

    return  await storageInstance.upload(obj)
};
