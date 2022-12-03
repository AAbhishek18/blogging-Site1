
const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

// //Authentication
// const authEntication = async function (req, res, next) {
//     try {
//         let header = req.headers;
//         let token = header["x-api-key"]
//         if (!token) return res.status(400).send({ status: false, msg: "Sorry,Header(token) Must Needed" })
//         let decodedtoken = jwt.verify(token, "group-25");
//         console.log(decodedtoken)
//         let authorLoged = decodedtoken.authorId;
//         console.log(authorLoged)
//         if (!authorLoged) return res.status(401).send({ status: false, msg: 'Invalid token' })
//         next()
//     }
//     catch (error) {
//         return res.status(500).send({ status: false, msg: error.message })
//     }
// }
// Autherisation
const authorIsation = async function (req, res, next) {
    try {
        let authorId;
        let header = req.headers;
        let token = header["x-api-key"]
        
        let decodedToken = jwt.verify(token, "abhishekKumar");
        
       
         authorId = decodedToken.authorId;//authorId is authorId of author who is loged in
        
         //fectching authorId from body or params
        let authorIdFromBody = req.body.authorId;
        let authorIdFromParams = req.query.authorId;

       

        //AuthorId validation
        if (decodedToken.authorId!=authorIdFromBody && decodedToken.authorId!=authorIdFromParams) 
        return res.status(401).send({ status: false, msg: "Sorry,authorisation required   " });
        next()
    }
    catch (error) {
        return res.status(404).send({ status: false, msg: error.message })
    }
}
module.exports={authorIsation}
