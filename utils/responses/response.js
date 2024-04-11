const successResponse = (res, status, message, data) => {
  return res.status(status).json({
    status: status === 200 ? true : false,
    message,
    data,
  });
};

module.exports = successResponse;
