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
