const Tasks = require("../models/Tasks");
const User = require("../models/User");
const Category = require("../models/Category");

//get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const queryCopy = { ...req.query };
    //Removing some fields for category

    const removeFields = ["sorttype"];
    removeFields.forEach((key) => delete queryCopy[key]);
    let tasks;
    if (req.query.sorttype == "low") {
      tasks = await Tasks.find(queryCopy)
        .sort({
          priority: 1,
        })
        .populate("category");
    } else if (req.query.sorttype === "high") {
      tasks = await Tasks.find(queryCopy)
        .sort({ priority: -1 })
        .populate("category");
    } else {
      tasks = await Tasks.find(queryCopy).populate("category");
    }

    return res.status(201).json({
      success: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//create tasks
exports.createTasks = async (req, res) => {
  try {
    const { title, description, category, dueDate, priority, status } =
      req.body;
    const category_name = category.name;
    const category_color = category.color;
    const yes = await Category.find({
      name: { $regex: category_name, $options: "i" },
      color: { $regex: category_color, $options: "i" },
    });
    if (yes.length === 0) {
      await Category.create({
        name: category_name,
        color: category_color,
      });
    }
    const newCategory = await Category.find({
      name: { $regex: category_name, $options: "i" },
      color: { $regex: category_color, $options: "i" },
    });
    const taskData = {
      title,
      description,
      dueDate,
      status,
      category: newCategory,
      priority,
      user: req.user._id,
    };
    const newdata = await Tasks.create(taskData);
    const user = await User.findById(req.user._id);

    newCategory[0].tasks.push(newdata._id);
    await newCategory[0].save();

    user.tasks.push(newdata._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Task Created",
      newdata,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete tasks
exports.deleteTask = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    const users = task.user;
    const categories = task.category;
    for (let i = 0; i < users.length; i++) {
      const curr_user = await User.findById(users[i]).populate("tasks");
      const index = curr_user.tasks.indexOf(task._id);
      curr_user.tasks.splice(index, 1);
      await curr_user.save();
    }

    for (let i = 0; i < categories.length; i++) {
      const curr_user = await Category.findById(categories[i]).populate(
        "tasks"
      );
      const index = curr_user.tasks.indexOf(task._id);
      curr_user.tasks.splice(index, 1);
      if (curr_user.tasks.length == 0) {
        await curr_user.deleteOne();
      } else {
        await curr_user.save();
      }
    }
    await task.deleteOne();
    res.status(201).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id).populate("category");
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    if (req.body.title) {
      task.title = req.body.title;
    }
    if (req.body.description) {
      task.description = req.body.description;
    }
    if (req.body.status) {
      task.status = req.body.status;
    }
    if (req.body.dueDate) {
      task.dueDate = req.body.dueDate;
    }
    if (req.body.priority) {
      task.priority = req.body.priority;
    }
    if (req.body.category) {
      //delete old category
      const categories = task.category;
      for (let i = 0; i < categories.length; i++) {
        const curr_user = await Category.findById(categories[i]).populate(
          "tasks"
        );
        const index = curr_user.tasks.indexOf(task._id);
        curr_user.tasks.splice(index, 1);
        const index2 = task.category.indexOf(curr_user._id);
        task.category.splice(index2, 1);

        // await task.save();
        if (curr_user.tasks.length == 0) {
          await curr_user.deleteOne();
        } else {
          await curr_user.save();
        }
      }

      //create new category or push in existing one
      const yes = await Category.find({
        name: { $regex: req.body.category.name, $options: "i" },
        color: { $regex: req.body.category.color, $options: "i" },
      });
      if (yes.length === 0) {
        await Category.create({
          name: req.body.category.name,
          color: req.body.category.color,
        });
      }
      const newCategory = await Category.find({
        name: { $regex: req.body.category.name, $options: "i" },
        color: { $regex: req.body.category.color, $options: "i" },
      });

      newCategory[0].tasks.push(task._id);
      await newCategory[0].save();

      task.category.push(newCategory[0]._id);
      // task.save();
    }
    await task.save();
    res.status(201).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get tasks by user
exports.getTaskByUser = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.body.name, $options: "i" },
    }).populate("tasks");
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const task_by_user = [];
    for (let i = 0; i < users.length; i++) {
      task_by_user.push(...users[i].tasks);
    }
    return res.status(201).json({
      success: true,
      task_by_user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get tasks by category
exports.getTaskByCategory = async (req, res) => {
  try {
    const category_tasks = await Category.find({
      name: { $regex: req.body.name, $options: "i" },
    }).populate("tasks");
    if (!category_tasks) {
      return res.status(404).json({
        success: false,
        message: "Tasks not found",
      });
    }
    const task_by_category = category_tasks[0].tasks;
    return res.status(201).json({
      success: true,
      task_by_category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
