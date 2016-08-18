var express = require('express');
var router = express.Router();

var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'At3l3IA4ncwvge1Tl1VNow',
  consumer_secret: 'tRPjtiaf3fwEnBsdzWSO_LtF7eE',
  token: '89XSVrqvbSh8bHV2W-NIB818ztzi9zbU',
  token_secret: 'saLYGemzbSCqllgt7EI8Vq-tIXM',
});

var searchResults;

router.get('/lat/:lat/long/:lng', function(req, res, next) {
  var lat = req.params.lat;
  var lng = req.params.lng;

  console.log(lat + " " + lng);

  // A callback based API is also available:
  yelp.search({ ll: lat + ',' + lng, deals_filter: 'true', limit: '10', category_filter: 'food', sort: '1'})
  .then(function (data) {
    // console.log(data);
    searchResults = data;
    res.render('search', {
      title: 'Results',
      // postalCode: postalCode,
      stores: searchResults['businesses']
    });

  })
  .catch(function (err) {
    res.render('search', {
      title: 'Error!',
      postalCode: 'Error!',
      stores: 'Error!',
    });
  });

});

module.exports = router;
