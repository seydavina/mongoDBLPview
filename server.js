const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/dblp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Création d'un schéma pour la collection "dblp"
const authorsSchema = new mongoose.Schema({
  _id: String,
  type: String,
  title: String,
  pages: {
    start: Number,
    end: Number,
  },
  year: Number,
  booktitle: String,
  url: String,
  authors: [String],
});

const Authors = mongoose.model('Authors', authorsSchema, 'dblp');

// Endpoint API pour récupérer les données avec pagination
app.get('/api/authors', async (req, res) => {
  const { page = 1, limit = 10, search = '', sort = 'title', order = 'asc' } = req.query;

  console.log('Query parameters:', req.query); // Log parameters

  try {
    const query = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { authors: { $regex: search, $options: 'i' } },
      ],
    };

    console.log('MongoDB query:', query); // Log MongoDB query

    const totalCount = await Authors.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    const authors = await Authors.find(query)
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    console.log('Results:', authors); // Log results

    res.json({ authors, totalPages });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
