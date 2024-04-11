const generateOtp = async () => {
  let otp = "";
  for (let index = 0; index < 5; index++) {
    const randomNumber = Math.floor(Math.random() * 10);
    otp += `${randomNumber === 0 ? randomNumber + 1 : randomNumber}`;
  }
  return Number(otp);
};

module.exports = generateOtp;
