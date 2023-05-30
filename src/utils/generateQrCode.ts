import * as QRCode from 'qrcode';
export const generateQR = async (text) => {
  try {
    const qr = await QRCode.toDataURL(text);
    return qr;
  } catch (err) {
    console.error(err);
  }
};
