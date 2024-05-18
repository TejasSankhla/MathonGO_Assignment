import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  customProperties: mongoose.Schema.Types.Mixed,
  unsubscribed: { type: Boolean, default: true },
});

userSchema.index({ email: 1, listId: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);
export default User;
