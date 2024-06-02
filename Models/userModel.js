import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

  name: String,
  email: String,
  password: String,
  links: Array
});

export default mongoose.model("tasks", UserSchema);
