const mongoose = require("mongoose");

const recipeDbSchema = new mongoose.Schema({
  title: String,
  notes: String,
  url: String,
  category: String,
  id: Number,

},
{
  collection: 'Recipes'
});

module.exports = mongoose.model("Recipe", recipeDbSchema);
