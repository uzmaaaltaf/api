// const jwt = require("jsonwebtoken");
// exports.authenticateToken= function (req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) {
//     return res.status(401).send("Access denied. No token provided.");
//   } else {
//     jwt.verify(authHeader, "uzma", (err, data) => {
//     //   console.log("jjjjjjjjjjjjjjjjjjj",data);
//       if (data) {
//         email=data.email;
//         next();
//       } else {
//         res.status(400).json({ err });
//       }
//     });
//   }
// }
const jwt= require("jsonwebtoken");
exports.authenticateToken= function(req, res, next){
const authHeader = req.headers["authorization"];
req.user
req.id
if(!authHeader){
    return res.status(401).send("Access Denied.....No Token Provided");
}
else{
    let decoded = jwt.verify(authHeader,"uzma",(err,data) => {
        if(data.email){
            req.user = data.email;
            req.id = data._id;
            // console.log(";;;;;;;-----", data._id);
            next();
        }
        else{
            res.status(400).json({err})
        }
    });
    }
    console.log("---------->00", req.user);
    console.log("---------->", req.id);
}