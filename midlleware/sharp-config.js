const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const filename = req.file.filename;
    const imagePath = path.join('images', filename);

    const optimizedFilename = filename.split('.')[0] + '.webp';
    const optimizedPath = path.join('images', optimizedFilename);

    await sharp(imagePath)
      .resize(800) 
      .webp({ quality: 80 })
      .toFile(optimizedPath);

    
    fs.unlinkSync(imagePath);

    
    req.file.filename = optimizedFilename;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'optimisation de l'image" });
  }
};


