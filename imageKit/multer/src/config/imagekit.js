const Imagekit = require("imagekit");

const storageInstance = new Imagekit({
  publicKey: process.env.PUBLIC_KEY  ,
  privateKey:process.env.PRIVATE_KEY ,
  urlEndpoint:process.env.URL_EndPoint,
});

const sendFile = async () => {
  await storageInstance.upload({ file, fileName });
};

module.exports = sendFile