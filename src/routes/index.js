import Express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import * as userController from "../controller/userController.js";
import * as listController from "../controller/list-controller.js";
import * as emailComtroller from "../controller/emailController.js";
import * as unsubscribeController from "../controller/unsubscribeController.js";


const router = Express.Router();

//  list routes
router.post("/lists", listController.createList); // create list

//add User to list

router.post("/add-users", upload.single("file"), userController.addUsers);

//Email sending routes
router.post("/send/:listId", emailComtroller.sendEmailToList);
router.post("/unsubscribe", unsubscribeController.unsubscribeUser);

export default router;
