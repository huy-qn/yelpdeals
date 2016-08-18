var express = require('express');
var router = express.Router();

// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'At3l3IA4ncwvge1Tl1VNow',
  consumer_secret: 'tRPjtiaf3fwEnBsdzWSO_LtF7eE',
  token: '89XSVrqvbSh8bHV2W-NIB818ztzi9zbU',
  token_secret: 'saLYGemzbSCqllgt7EI8Vq-tIXM',
});

var searchResults;
var postalCode = '92116';

router.get('/', function(req, res, next) {

  // A callback based API is also available:
  yelp.search({ location: '92115', deals_filter: 'true', category_filter: 'restaurants'})
  .then(function (data) {
    searchResults = data;

    res.render('search', {
      title: 'Results',
      postalCode: postalCode,
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

router.post('/', function(req, res, next) {
  postalCode = req.body.postalcode;

  // A callback based API is also available:
  yelp.search({ ll: postalCode, deals_filter: 'true', category_filter: 'restaurants'})
  .then(function (data) {
    searchResults = data;

    res.render('search', {
      title: 'Results',
      postalCode: postalCode,
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

})

module.exports = router;
