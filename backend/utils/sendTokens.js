
const sendRefreshToken=(res,refreshToken)=>{
    res.cookie("refreshtoken",refreshToken,{httpOnly:true,path: "/refresh"})
};

module.exports = {sendRefreshToken};