const express = require('express');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

const app = express();

const PORT = 8000;

app.use(express.static(path.join(__dirname, 'files')))

app.get('/download', (req, res) => {
   const filePath = path.join(__dirname, 'files', 'build.exe');

   fs.readFile(filePath, (err, data) => {
      if (err) {
         res.status(404).send('File not found.');
      } else {
         const contentType = mime.contentType("exe");

         res.setHeader('Content-Type', contentType);
         res.setHeader('Content-Disposition', 'attachment; filename=build.exe');
         
         res.send(data);
      }
   });
});

app.listen(PORT, () => {
   console.log(`Server is running on :${PORT}`)
})