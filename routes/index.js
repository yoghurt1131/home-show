require('date-utils');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 日付
  let renderMap = new Object();
  renderMap['date'] = new Date().toFormat('MM/DD(DDD)');
  // wether
  renderMap['wether'] = 'sun'
  // temperature
  renderMap['temperature'] = '31℃/24℃'

  res.render('index', renderMap);
});

module.exports = router;
