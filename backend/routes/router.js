import {Router} from "express";
import {jwtAuth} from "../middleware/jwtAuthentication.js";
import signup from "../controllers/signUp.js";
import login from "../controllers/login.js";
import create from "../controllers/addProblem.js"
import getproblembyid from "../controllers/getIndividualProblem.js";
import deleteproblem from "../controllers/deleteProblem.js";
import update from "../controllers/updateproblem.js";
import getAllProblems from "../controllers/getAllProblems.js";
import getleaderboard from "../controllers/leaderboard.js";
import getbydifficulty from "../controllers/getByDifficulty.js";
import profile from "../controllers/profile.js";
import deleteUser from "../controllers/deleteUser.js";

const router = Router();

router.post("/signUp", signup);
router.post("/login", login);
router.post("/", jwtAuth);
router.post("/addProblem",create);
router.get("/getAllProblems",getAllProblems);
router.get("/getIndividualproblem/:id",getproblembyid);
router.get("/deleteProblem/:id",deleteproblem);
router.put("/updateProblem/:id",update);
router.get("/leaderboard",getleaderboard);
router.get("/getByDifficulty",getbydifficulty);
router.post("/profile",profile);
router.post('/deleteUser',deleteUser);

export default router;
