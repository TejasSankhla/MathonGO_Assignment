import User from "../models/user.js";
import csv from "csv-parser";
import List from "../models/list.js";
import fs from "fs";
import path from "path";
export const addUsers = async (req, res) => {
  const { listId } = req.body;
  const file = req.file;

  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const users = [];
    const errors = [];

    const processCSV = new Promise((resolve, reject) => {
      fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", (row) => {
          // Check for required fields
          if (!row.name || !row.email) {
            errors.push({
              name: row.name || "",
              email: row.email || "",
              customProperties: {},
              error: "Missing required field(s): name and/or email",
            });
            return;
          }

          const user = {
            name: row.name,
            email: row.email,
            listId: list._id,
            customProperties: {},
          };

          // Assign custom properties or fallback values
          list.properties.forEach((prop) => {
            user.customProperties[prop.title] =
              row[prop.title] || prop.fallbackValue;
          });

          users.push(user);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    await processCSV;

    let successCount = 0;
    let errorCount = 0;

    for (const user of users) {
      try {
        await User.create(user);
        successCount++;
      } catch (err) {
        errorCount++;
        errors.push({ ...user, error: err.message });
      }
    }

    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
      }
    });

    const totalUsers = await User.countDocuments({ listId });

    res.status(201).json({
      successCount,
      errorCount,
      totalUsers,
      errors,
    });
  } catch (err) {
    if (file && fs.existsSync(file.path)) {
      fs.unlink(file.path, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error removing file:", unlinkErr);
        }
      });
    }
    if (err.code && err.code == 11000) {
      const duplicateKeyError = {};
      const field = Object.keys(err.keyValue)[0];
      duplicateKeyError[field] = `The ${field} already exists.`;

      return res.status(409).json({
        success: false,
        message: "Duplicate key error",
        err: duplicateKeyError
      });
    }
    res.status(500).json({
      error: "An error occurred while processing the CSV file.",
      details: err.message,
    });
  }
};
