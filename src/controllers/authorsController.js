const jwt = require("jsonwebtoken");
const AuthorModel = require("../models/authorModel")
//regex for email
function validateEmail(usermail) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(usermail);
}
// Create author API
const createAuthor = async function (req, res) {

    try {
        let data = req.body
        if (Object.keys(data).length != 0) {
            let title = data.title
            if (!title) return res.status(400).send({ msg: "title must require" })
            if (title!== "Mr" && title!== "Mrs" && title !== "Miss") return res.status(400).send({ status: false, msg: `invalid titel,title should be -['Mr','Mrs','Miss']` })
            if (!data.fname) return res.status(400).send({ status: false, msg: "plz enter fname" })
            if (!data.lname) return res.status(400).send({ status: false, msg: "plz enter lname" })
            if (!data.password) return res.status(400).send({ status: false, msg: "plz enter password" })
            if (!data.email) return res.status(400).send({ status: false, msg: "plz enter email" })
            if (!validateEmail(data.email)) return res.status(400).send({ status: false, msg: "plz enter valid email(like-aBcd123@gmail.com)" })
    
            // db call to check email is already exist or not
            let a = await AuthorModel.find({ email: data.email })
            if (a.length != 0) return res.status(400).send({ status: false, msg: "email already used" })
    
            //if email is not exist then create author
            let savedData = await AuthorModel.create(data)
            res.status(201).send({ status: true,msg:"author registration successful", data: savedData })
        }

        // if data is empty
  
        else res.status(400).send({ status: false, msg: " body must require" })

    }
    catch (error) {
    res.status(500).send({ status: false, msg: error.message })
}
}

// lOGIN Author API
const loginAuthor = async function (req, res) {
    try {
      let email = req.body.email;
      let password = req.body.password;
      if (!email)
        return res.status(400).send({ status: false, msg: "plz enter email" });
      if (!password)
        return res.status(400).send({ status: false, msg: "plz enter password" });
      let valid = await AuthorModel.findOne({ email: email, password: password });
      if (!valid) {
        return res
          .status(404)
          .send({ status: false, msg: "email or password is wrong" });
      }
  
      // if email and password is valid then generate token
      let token = jwt.sign(
        {
          authorId: valid._id.toString(),
          iat: $numericDate = Math.floor(Date.now() / 1000),
          
        },
        "abhishekKumar",
        { expiresIn:"1200s" }
      );
      res.setHeader("x-api-key", token);
      res.status(200).send({ status: true, msg: "author login sucsessful", data: token });
    } catch (error) {
      res.status(500).send({ status: false, msg: error.message });
    }
  };




module.exports = {createAuthor,loginAuthor}


