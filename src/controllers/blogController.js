
const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");

const moment = require("moment");

let time = moment().format("YYYY-MM-DDTHH:MM:ss.SSS");
//
const createBlog = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length !== 0) {
      if (!data.title)
        return res
          .status(400)
          .send({ status: false, msg: "blog title must needed" });
      if (!data.body)
        return res.status(400).send({ status: false, msg: "blog body needed" });
      if (!data.authorId)
        return res
          .status(400)
          .send({ status: false, msg: "plz enter author Id" });

      let validAuthor = await authorModel.findById({ _id: data.authorId });
      if (validAuthor === null)
        return res
          .status(400)
          .send({ status: false, msg: "Author Id not valid" });
      if (!data.category)
        return res
          .status(400)
          .send({ status: false, msg: "plz enter category" });
      if (data.isPublished == true) data.publishedAt = time;
      if (data.deletedAt == true) data.deletedAt = time;

      //if authorId is valid then create blog
      let savedData = await blogModel.create(data);
      res
        .status(201)
        .send({
          status: true,
          msg: "Blog created successfull",
          data: savedData,
        });
    } else
      res.status(400).send({ status: false, msg: "request body must needed" });
  } catch (error) {
    res.status(400).send({ status: false, msg: error.message });
  }
};

// Update Blog API
const updateBlogs = async function (req, res) {
  try {
    //fetching data from request body
    let data = req.body;
    var blogId =  req.params.blogId;
    
    let gotblog = await blogModel.find({ _id: blogId, isDeleted: false });
    if (gotblog.length == 0)
      return res.status(404).send({ status: false, msg: "Blog not exist" });
    
      //if blog is published then update publishedAt
    if (data.isPublished === true) {
      var updatedBlog = await blogModel.findOneAndUpdate(
        { _id: blogId },
        {
          title: data.title,
          body: data.body,
          category: data.category,
          $push: {
            tags: data.tags,
            subcategory: data.subcategory,
          },
          $set: {
            publishedAt: time,
            isPublished: true,
          },
        },
        { new: true }
      );
      return res
        .status(200)
        .send({ status: true, msg: "update successful", data: updatedBlog });
    }
    //if blog is not published then update blog
    if (data.isPublished === false) {
      req.body.publishedAt = " ";
      detailsToUpdate = req.body;
      var updatedBlog = await blogModel.findOneAndUpdate(
        { _id: blogId },
        {
          title: data.title,
          body: data.body,
          category: data.category,
          $push: { tags: data.tags, subcategory: data.subcategory },
          $set: { publishedAt: "", isPublished: false },
        },
        { new: true }
      );

    
      return res
        .status(200)
        .send({ status: true, msg: "update succesfull", data: updatedBlog });
    }

    // var updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { title: data.title, body: data.body,category:data.category, $push: { tags: data.tags, subcategory: data.subcategory } }, { new: true })
    // res.send({status:true,msg:"update successfull", data: updatedBlog })
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


//delete blog by id
const deleteBlogs = async function (req, res) {
  try {
    let id = req.params.blogId;
       
    let blog=await blogModel.find({_id:id,isDeleted:false})
    if(blog.length==0){
      return res.status(404).send({status:false,msg:"Blog not exist"})
    }



       let allBlogs = await blogModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: time } },
      { new: true, upsert: true }
    );

    if (allBlogs)
      res.status(200).send({ status: true, msg: "delete sucsessful", data: allBlogs });
    
    else res.status(404).send({ status: false, msg: "No Blogs Exist" });
  } 
  catch (err) {
    res.status(400).send({ status: false, msg: err.message });
  }
};


//delete blogs by fields API
const deleteBlogsByFields = async function (req, res) {
  try {
    let data = req.query;
    data.isDeleted = false;
    let any = await blogModel.find(data);
    if (Object.keys(any).length !== 0) {
      let all = await blogModel.updateMany(
        data,
        { $set: { isDeleted: true, deletedAt: time } },
        { new: true, upsert: true }
      );
      res
        .status(200)
        .send({ status: true, msg: "delete sucsessfull", data: all });
    } else res.status(404).send({ status: false, msg: "No Blogs Exist" });
  } catch (err) {
    res.status(400).send({ status: false, msg: err.message });
  }
};

// Get Blogs API
const getBlog = async function (req, res) {
  try {
    let data = req.query;
    if (Object.keys(data).length === 0) {
      return res.status(400).send({ status: false, msg: "Please provide the detailse " });
    }

      let allBlogs = await blogModel.find({
        isPublished: true,
        isDeleted: false,
      });
      if (allBlogs.length == 0){
        return res.status(404).send({ status: false, msg: "No Blogs Exist" });
      }
    //     else{
    //   return res
    //     .status(200)
    //     .send({ status: true, msg: "All blogs", data: allBlogs });
    //     }
    
      let filterBlogs = await blogModel.find({
      $and: [data, { isPublished: true }, { isDeleted: false }],
    });
    if (filterBlogs.length === 0)
      return res.status(404).send({ status: false, msg: "Blogs not found" });
    
    res.status(200).send({ status: true, msg: " All blogs", data: filterBlogs });
  } 
  catch (error) {
    res.status(400).send({ status: false, msg: error.message });
  }
};



module.exports ={
                   createBlog,
                   updateBlogs,
                   deleteBlogs,
                   deleteBlogsByFields,
                   getBlog
                };

