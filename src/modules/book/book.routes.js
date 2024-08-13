import  {Router} from 'express';
import * as BC from "./book.controller.js";

const router=Router() 

router.post("/create",BC.createBook)
router.get("/",BC.getBooks)
router.get("/:id",BC.getById)
router.patch("/update",BC.updateBook)
router.patch("/delete",BC.deleteBook)


export default router