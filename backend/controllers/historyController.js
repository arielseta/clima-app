const SearchHistory = require('../models/SearchHistory');

exports.saveSearch = async (req, res) => {
  try {
    const { city, weatherData } = req.body;

    const entry = await SearchHistory.create({
      userId: req.userId,
      city,
      weatherData
    });

    const history = await SearchHistory.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    if (history.length > 5) {
      const toDelete = history.slice(5);
      await SearchHistory.deleteMany({ _id: { $in: toDelete.map(e => e._id) } });
    }

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
