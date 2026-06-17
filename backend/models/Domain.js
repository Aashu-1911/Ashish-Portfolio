import mongoose from "mongoose";

const domainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
  },
  description: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Domain", domainSchema);
