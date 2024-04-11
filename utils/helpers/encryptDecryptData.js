const CryptoJS = require("crypto-js");

function encryptData(data) {
  try {
    const dataToEncrypt = JSON.stringify(data);
    const encryptionKey = process.env.ENCRYPTION_KEY;
    const encryptedData = CryptoJS.AES.encrypt(
      dataToEncrypt,
      encryptionKey
    ).toString();
    return encryptedData;
  } catch (error) {
    console.error(error);
    return "";
  }
}

function decryptData(data) {
  try {
    const decryptionKey = process.env.ENCRYPTION_KEY;
    const decryptedOutput = CryptoJS.AES.decrypt(data, decryptionKey).toString(
      CryptoJS.enc.Utf8
    );
    try {
      const output = JSON.parse(decryptedOutput);
      return output;
    } catch (error) {
      return decryptedOutput;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { decryptData, encryptData };
