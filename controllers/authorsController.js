const siteData = require('../data/siteData');
const Author =  require('../models/authorModel');

const getAllAuthors = async (request, response, next) => { 
    await Author.find({}).then((authors) =>
    response.status(200).json({
      success: { message: "This route points to the Authors page with all of the authors" },
      data: authors, siteData,
      statusCode: 200,
    })
   )
}

const getAuthor = async (request, response, next) => {
  const { _id } = request.params;
    await Author.findOne({_id: _id}).then((author) => {
    response.status(200).json({
      success: { message: "This route points to the Authors page with one of the authors by the ID" },
      data: foundAuthor, siteData, 
      statusCode: 200,
    });  
    })
}



module.exports = { getAllAuthors, getAuthor };