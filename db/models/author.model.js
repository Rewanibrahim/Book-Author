import mongoose, {Schema , model} from "mongoose";

const authSchema = new Schema({

    name:{
        type:String,
        required: true
    },
    bio:{
        type:String
    },
    birthDate:{
        type:Date
    },
    books:[{
        type:mongoose.Schema.Types.ObjectId, ref: 'book'
    }]

},
{
    timestamps:true
})

const authModel= model("auth",authSchema)
export default authModel;