import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.post("/", (req, res) => {
  const text = req.body.text;

  // Create the QR code image
  var qr_svg = qr.image(text, { type: "png" });

  // Set the content type to image/png
  res.type("png");

  // Stream the image to the response
  qr_svg.pipe(res);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
