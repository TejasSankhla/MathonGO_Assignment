import mongoose from "mongoose";
const connect = async () => {
  await mongoose.connect("mongodb://0.0.0.0:27017/mathonGO");
  console.log("mongo server connected");
};
export default connect;
