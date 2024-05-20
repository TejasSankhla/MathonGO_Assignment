import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.url;
const connect = async () => {
  try {
    await mongoose.connect(url);

    console.log("mongo server connected");
  } catch (error) {
    console.log("not able to connect mongo", error);
  }
};
export default connect;
