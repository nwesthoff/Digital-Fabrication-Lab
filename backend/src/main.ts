import express from "express";
import StlThumbnailer from "node-stl-thumbnailer";
import request from "request";
import NodeStl from "node-stl";

console.log("Digital Fabrication App - STARTING");
// Create Express server
const app = express();

app.listen(3000, function() {
  console.log("Listening on port 3000\n");
});

app.get("/stl-parser", (req, res) => {
  const requestSettings = {
    method: "GET",
    url: req.query.url,
    encoding: null
  };

  request(requestSettings, function(error, response, body) {
    var stl = new NodeStl(body, { density: 1.0 });
    console.log("Parsed: " + req.query.url);
    console.log(stl);

    res.contentType("application/json");
    res.send(stl);
  });
});

app.get("/thumbnailer", function(req, res, next) {
  var thumbnailer = new StlThumbnailer({
    url: req.query.url,
    requestThumbnails: [
      {
        width: 500,
        height: 500
      }
    ]
  })
    .then(function(thumbnails) {
      thumbnails[0].toBuffer(function(err, buf) {
        res.contentType("image/png");
        res.send(buf);
      });
    })
    .catch(function(err) {
      res.status(500);
      res.send("Error thumbnailing: " + err);
    });
});
