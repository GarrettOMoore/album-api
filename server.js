var express = require('express');
var app = express();
var db = require('./models');

app.use(express.urlencoded({extended:false}));

app.get('/albums/', function(req, res) {
    db.album.findAll().then(function(album){
        res.json(album);
    })
});

app.get('/albums/:id', function(req, res) {
    db.album.findById(parseInt(req.params.id)).then(function(album){
        res.json(album)
    })
})

app.post('/albums', function(req, res) {
    db.album.create({
        title: req.body.title,
        artist: req.body.artist,
        year: parseInt(req.body.year)
    }).then(function(album){
        res.json(album);
    })});

app.put('/albums/:id', function(req, res) {
    db.album.update ({
        title: req.body.title,
        artist: req.body.artist,
        year: parseInt(req.body.year)
    },
    {
        where: {
            id: parseInt(req.params.id)
        }
    }).then(function(album) {
        res.json(album);
    })
})

app.delete('/albums/:id', function(req, res) {
    db.album.destroy ({
        where: { id: parseInt(req.params.id) }
    }).then(function(album){
        res.json({status: "deleted"});
    })
});


    app.listen(3000);