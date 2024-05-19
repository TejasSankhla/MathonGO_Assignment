// controllers/unsubscribeController.js
import User from "../models/user.js";

export const unsubscribeUser = async (req, res) => {
  console.log(req.query);
  const { listId, email } = req.query;
  console.log(listId, email);
  try {
    const user = await User.findOne({
      listId: listId.toString(),
      email: email.toString(),
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.subscribed = false;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "You have been unsubscribed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
