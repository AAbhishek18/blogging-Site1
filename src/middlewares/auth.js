
const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");


// Authorization middleware
const authorIsation = async function (req, res, next) {
    try {
        let authorId;
        let header = req.headers;
        let token = header["x-api-key"]
        
        let decodedToken = jwt.verify(token, "abhishekKumar");
        
         //authorId is authorId of author who is loged in
         authorId = decodedToken.authorId;
        
         //fetching authorId from body or params
        let authorIdFromBody = req.body.authorId;
        let authorIdFromParams = req.query.authorId;

       

        //AuthorId validation
        if (decodedToken.authorId!=authorIdFromBody && decodedToken.authorId!=authorIdFromParams) 
        return res.status(401).send({ status: false, msg: "Sorry,authorisation required   " });
        next()
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: "Your token is expired login again" })
    }
}
module.exports={authorIsation}
