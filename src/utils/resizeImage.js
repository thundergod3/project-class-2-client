import Compress from "compress.js";

const compress = new Compress();

const resizeImage = async (file) => {
  const resizedImage = await compress.compress([file], {
    size: 2,
    quality: 0.72,
    resize: true,
  });
  const img = resizedImage[0];
  const base64str = img.data;
  const imgExt = img.ext;
  const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
  return resizedFiile;
};

export default resizeImage;
