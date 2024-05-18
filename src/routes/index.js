import Express from "express";
import * as userController from "../controller/userController.js";
import * as listController from "../controller/list-controller.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = Express.Router();

//  list routes
router.post("/lists", listController.createList); // create list

//add User to list

router.post("/add-users", upload.single("file"), userController.addUsers);

export default router;
