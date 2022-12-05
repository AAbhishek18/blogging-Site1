
const express = require('express');
const router = express.Router();

const authorsController = require("../controllers/authorsController.js");
const blogController = require("../controllers/blogController.js");
const middleware = require("../middlewares/auth")




router.post("/createAuthor", authorsController.createAuthor)

router.post("/login", authorsController.loginAuthor)

router.post("/createBlog", middleware.authorIsation, blogController.createBlog)

router.get("/blogs",  blogController.getBlog)

router.put("/blogs/:blogId",  middleware.authorIsation, blogController.updateBlogs)

router.delete("/blogs",  middleware.authorIsation, blogController.deleteBlogsByFields)

router.delete("/blogs/:blogId",  middleware.authorIsation, blogController.deleteBlogs)


module.exports = router;

