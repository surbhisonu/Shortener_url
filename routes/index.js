// require and instantiate express
var express = require('express');
var router = express.Router();
var Shortproj = require("../models/url");
 var shortid = require('shortid');

 var authenticate = function (req, res, next) {
     var str=req.body.originalurl;
    var n = str.search (/http|https|localhost|www/);
    if ( n==0 ){
      next();
    }
    else{
      return res.send("Please enter valid url");
    }
    
}
/* GET home page. */
router.get('/shortproject', function(req, res, next) {
  res.render('sfrom');
});

router.post('/shortproject', function(req, res, next){
           var abc = req.body.original_url ;
           console.log(abc);
           var q = shortid.generate();
           var info = {original_url :abc, short_url: q};
           console.log(info);
           var query = Shortproj(info);
           query.save(function (err, data){
            if (err){
              return res.json({
                error : true,
                reason : err
              })
              console.log("error");
            }
            else{
               console.log(data);
              console.log("data sent");
             return res.json({
              error : false,
              name  : data._id,
              first : data.original_url,
              last  : data.short_url
             });
            }
           });
           console.log(q);
});

router.get('/shortproject/:url', function(req, res, next) {
 Shortproj.findOne({ short_url : req.params.url})
  .exec(function(err,data){
    console.log(data.original_url);
     return res.redirect(data.original_url);
  });
});

module.exports = router;
