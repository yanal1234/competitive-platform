const sendRefreshToken = (res, refreshToken) => {
  res.cookie("refreshtoken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/api/auth/refresh",
  });
};

const sendAccessToken = (res, accessToken) => {
  res.cookie("accesstoken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
};

module.exports = { sendRefreshToken, sendAccessToken };
