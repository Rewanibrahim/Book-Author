import authorModel from "../../../db/models/author.model.js"



//<<<<<<<<<<<<<<<<<<<<<<<<  Create author >>>>>>>>>>>>>>>>>>>>>
export const createAuth=async (req,res,next)=>{
    const { name, bio, birthDate } = req.body;

    const author = await authorModel.create({ name, bio, birthDate });
        res.status(201).json({ msg: "DONE", author });
}
//<<<<<<<<<<<<<<<<<<<<<<<<  retrieve all authors  >>>>>>>>>>>>>>>>>>>>>
export const getAuthors = async (req, res,next) => {
    try {
      const { page = 1, limit = 10, search = '' } = req.query;
      const authors = await authorModel.find({
        name: { $regex: search, $options: 'i' }
      }).populate('books')
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.json(authors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
//<<<<<<<<<<<<<<<<<<<<<<<<  retrieve author by Id  >>>>>>>>>>>>>>>>>>>>>
export const getById=async (req,res,next)=>{
    const auth = await authorModel.findById(req.params.id);
    res.status(200).json({msg: "Done", auth})
}

//<<<<<<<<<<<<<<<<<<<<<<<<   update author by Id  >>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const updateAuthor=async (req,res,next)=>{
    const { name, id } = req.body;
    const auth = await authorModel.findByIdAndUpdate(
        id,{ name },{ new: true}
        );
    res.status(200).json({msg: "Done", auth})
}

//<<<<<<<<<<<<<<<<<<<<<<<<   Delete author by Id  >>>>>>>>>>>>>>>>>>>>>>>>>>>>
export const deleteAuthor=async (req,res,next)=>{
    const {id } = req.body;
    const auth = await authorModel.findByIdAndDelete(id);
    res.status(200).json({msg: "Done", auth})
}

 