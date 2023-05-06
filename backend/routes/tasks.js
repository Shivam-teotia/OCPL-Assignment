const express = require("express");
const {
  createTasks,
  deleteTask,
  updateTask,
  getAllTasks,
  getTaskByUser,
  getTaskByCategory,
} = require("../controller/tasks");
const { isAuthenticated } = require("../middlewares/isAuth");
const router = express.Router();

router.route("/getTasks").get(getAllTasks);
router.route("/gettaskbyuser").post(isAuthenticated, getTaskByUser);
router.route("/gettaskbycategory").post(isAuthenticated, getTaskByCategory);
router.route("/createtasks").post(isAuthenticated, createTasks);
router.route("/updatetasks/:id").put(isAuthenticated, updateTask);
router.route("/deletetasks/:id").delete(isAuthenticated, deleteTask);
module.exports = router;
