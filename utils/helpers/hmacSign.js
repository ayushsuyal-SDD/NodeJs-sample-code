const crypto = require("crypto");

const hmacSign = (signingKey, originalRequestBuffer) => {
  try {
    console.log("signingKey = ", signingKey);
    console.log("originalRequestBuffer = ", originalRequestBuffer);
    const key = Buffer.from(signingKey, "utf8");
    return crypto
      .createHmac("sha256", key)
      .update(originalRequestBuffer)
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  } catch (error) {
    return "";
  }
};

module.exports = hmacSign;
