
const sendRefreshToken = (res, refreshToken) => {
  res.cookie("refreshtoken", refreshToken, { httpOnly: true, secure: false, samSite: "lax" })
};

module.exports = { sendRefreshToken };
