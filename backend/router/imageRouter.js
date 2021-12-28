const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs')

router.get('/', async (req, res) => {
  try {
    const { filename = "unknown.png", directory = "" } = req.query;
    const basePath = __dirname.replace('\\router', '');
    const uploadPaths = path.join(basePath, 'resources');

    if (directory === "products") {
      const productsPath = path.join(uploadPaths, directory, filename);
      return res.download(productsPath);
    }

    if (directory === "user") {
      const productsPath = path.join(uploadPaths, directory, filename);
      if (fs.existsSync(productsPath)) {
        return res.download(productsPath);
      } else {
        console.log(path.join(uploadPaths, "unknown.jpg"))
        return res.download(path.join(uploadPaths, "unknown.png"));
      }
    }

    if (fs.existsSync(path.join(uploadPaths, filename))) {
      res.download(path.join(uploadPaths, filename));
    } else {
      res.download(path.join(uploadPaths, "unknown.png"));
    }

    // if (fs.existsSync(path.join(uploadPath, filename))) {
    //   return res.download(path.join(uploadPath, filename));
    // }

  } catch (err) {
    console.log('err')
  }
});

module.exports = router;

