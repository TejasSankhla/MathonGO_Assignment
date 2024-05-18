import List from "../models/list.js";

export const createList = async (req, res) => {
  //   console.log(req.body);
  const { title, properties } = req.body;
  //   console.log(title, properties);
  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
      err: { title: "Title is required" },
    });
  }
  if (!properties || !Array.isArray(properties)) {
    return res.status(400).json({
      success: false,
      message: "Properties must be an array",
      err: { properties: "Properties must be an array" },
    });
  }
  try {
    const list = new List({ title, properties });
    await list.save();

    res.status(201).json({
      data: list,
      success: true,
      message: "list created succesfully",
      err: {},
    });
  } catch (err) {
    // Handle specific errors
    if (err.name === "ValidationError") {
      const validationErrors = {};
      for (const key in err.errors) {
        if (err.errors.hasOwnProperty(key)) {
          validationErrors[key] = err.errors[key].message;
        }
      }
      return res.status(400).json({
        success: false,
        message: "Validation error",
        err: validationErrors,
      });
    }
    // Duplicate key errors
   

    // Catch other errors
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the list",
      err: { message: err.message, name : err.name },
    });
  }
};
