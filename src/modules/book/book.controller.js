import bookModel from "../../../db/models/book.model.js"



//<<<<<<<<<<<<<<<<<<<<<<<<  Create book  >>>>>>>>>>>>>>>>>>>>>
export const createBook=async (req,res,next)=>{
    const {title,content,author,publishedDate} = req.body

    const book = await bookModel.create({title,content,author,publishedDate})
    res.status(201).json({msg: "DONE", book})
}

//<<<<<<<<<<<<<<<<<<<<<<<<  retrieve all books  >>>>>>>>>>>>>>>>>>>>>
export const getBooks = async (req, res,next) => {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const books = await bookModel.find({
        title: { $regex: search, $options: 'i' }
      })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//<<<<<<<<<<<<<<<<<<<<<<<<  retrieve book by ID  >>>>>>>>>>>>>>>>>>>>>
export const getById=async (req,res,next)=>{
    const book = await bookModel.findById(req.params.id);
    res.status(200).json({msg: "Done", book})
}

//<<<<<<<<<<<<<<<<<<<<<<<<   update Book by ID >>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const updateBook=async (req,res,next)=>{
    const { title, id } = req.body;
    const book = await bookModel.findByIdAndUpdate(
        id,{ title },{ new: true }
        );
    res.status(200).json({msg: "Done", book})
}

//<<<<<<<<<<<<<<<<<<<<<<<<   Delete Book by Id  >>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const deleteBook=async (req,res,next)=>{
    const {id} = req.body;
    const book = await bookModel.findByIdAndDelete(id);
    res.status(200).json({msg: "Done", book})
}


//<<<<<<<<<<<<<<<<<<<<<<<<  Retrieve all books with Pagination  >>>>>>>>>>>>>>>>>>>>>
/*export const getPagination = async (req, res, next) => {
    try {
      // Parse and validate the page and limit query parameters
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
  
      // Ensure page and limit are positive integers
      if (page < 1 || limit < 1) {
        return res.status(400).json({ message: "Page and limit must be positive integers" });
      }
  
      // Ensure that query only filters by criteria other than _id unless explicitly needed
      const query = {}; 
  
      // Fetch paginated results
      const books = await bookModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
  
      // Count the total documents that match the query
      const count = await bookModel.countDocuments(query);
  
      // Return the paginated results
      res.status(200).json({
        books,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
  
    } catch (error) {
      console.error('Error fetching paginated books:', error);
      next(error); // Pass the error to the next middleware (e.g., an error handler)
    }
  };
  */
  /*export const searchBooks = async (req, res) => {
    try {
        const { title, author } = req.query;
        const query = {};

        if (title) {
            query.title = new RegExp(title, 'i'); 
        }
        if (author) {
            query.author = new RegExp(author, 'i');
        }

        const books = await bookModel.find(query);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};*/