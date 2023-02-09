var express = require('express');
var router = express.Router();
var hash_service = require('../services/hash_service.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/cryptageMessage', function(req, res, next) {
  var hashed = hash_service.hashMessage(req.body.text, req.body.algo, req.body.secretKey);
  res.send(hashed);
  console.log(hashed);
});

router.post('/decryptageHash', function(req, res, next) {
  var hashed = hash_service.decryptMessage(req.body.text, req.body.algo, req.body.secretKey);
  res.send(hashed);
  console.log(hashed);
});

router.post('/cryptageFile', function(req, res, next) {
  res.send(req.body);
  console.log(req.body.file);
  //var hashed = hash_service.hashFile(req.body.text, req.body.algo);
  //res.send(hashed);
});

module.exports = router;
