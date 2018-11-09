// index.js
var StlThumbnailer = require('./index');
var app = require("express")();

let x = 50;
app.get('/', function(req, res, next) {
    x += 10;
    console.log("x: ", x)
    var thumbnailer = new StlThumbnailer({
        // url: req.query.url,           // url OR filePath must be supplied, but not both
        filePath: "sample.stl",            // load file from filesystem
        requestThumbnails: [
            {
                width: 500,
                height: 500,
                cameraAngle: [x,50,100],         // optional: specify the angle of the view for thumbnailing. This is the camera's position vector, the opposite of the direction the camera is looking.
                showMinorEdges: true,             // optional: show all edges lightly, even ones on ~flat faces
                metallicOpacity: 0,               // optional: some models, particularly those with non-flat surfaces or very high-poly models will look good with this environment map
                enhanceMajorEdges: true,          // optional: major edges will appear more boldly than minor edges
                shadeNormalsOpacity: 0.4,         // optional: faces will be shaded lightly by their normal direction
                backgroundColor: 0xffffff,        // optional: background color (RGB) for the rendered image
                baseOpacity: 0.7,                 // optional: translucency of the base material that lets you see through it
                baseColor: 0xffffff,              // optional: base color
                baseLineweight: 0.7,              // optional: lineweights will scale to image size, but this serves as a base for that scaling. Larger numbers = heavier lineweights
                lineColor: 0x000000               // optional: color of the linework
            }
        ]   
    })
    .then(function(thumbnails){
          // thumbnails is an array (in matching order to your requests) of Canvas objects
          // you can write them to disk, return them to web users, etc
          thumbnails[0].toBuffer(function(err, buf){      
          res.contentType('image/png');
          res.send(buf)
        })
    })
    .catch(function(err){
        res.status(500);
        res.send("Error thumbnailing: "+err);
    });
});

app.listen(3000, function () {
  console.log('Listening on port 3000\n')
});