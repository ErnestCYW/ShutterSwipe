//upload callback function

// module.exports = async (req, res, next) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: "No file uploaded" });
//   }

//   const file = req.files.file;

//   file.mv(`${__dirname}/../../picture_server/${file.name}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
//     res.json({ fileName: file.name, filePath: "/uploads/${file.name}" });
//   });

//   next();
// };
