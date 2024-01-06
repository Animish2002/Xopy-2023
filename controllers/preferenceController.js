// preferenceController.js
import Preference from '../models/Preference.js';

// Save preferences to MongoDB
export const savePreferences = async (req, res) => {
  const { fileName, preferences } = req.body;

  const newPreference = new Preference({ fileName, preferences });
  await newPreference.save();

  res.json({ message: 'Preferences saved successfully' });
};
