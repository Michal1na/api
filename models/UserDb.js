const mongoose = require("mongoose");

const recipeDbSchema = new mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  salt: String,
  
},
{
  collection: 'Users'
});

module.exports = mongoose.model("User", recipeDbSchema);
