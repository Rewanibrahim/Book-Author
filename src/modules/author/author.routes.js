import  {Router} from 'express';
import * as AC from "./author.controller.js";

const router=Router() 

router.post("/create",AC.createAuth)
router.get("/",AC.getAuthors)
router.get("/:id",AC.getById)
router.patch("/update",AC.updateAuthor)
router.delete("/delete",AC.deleteAuthor)

export default router