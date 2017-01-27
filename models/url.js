var mongoose = require('mongoose');
var UrlSchema = new mongoose.Schema({
                         
                         original_url : String,
                         short_url    : String

 });   

var Url = mongoose.model('Url', UrlSchema);
module.exports = Url;