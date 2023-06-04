const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/recipe-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  ingredients: [String],
  instructions: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/api/recipes', (req, res) => {
  const { ingredient } = req.query;

  Recipe.find({ ingredients: { $in: [ingredient] } })
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((error) => {
      console.error('Error retrieving recipes:', error);
      res.status(500).json({ error: 'Failed to retrieve recipes' });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


