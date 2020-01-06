var productModel = require('../models/product');
var advertisementModel = require('../models/advertisement')
var typeModel = require('../models/type')

module.exports.home = function(req, res) {
    productModel.getItems(function(items) {
        typeModel.getAllTypes(function(types) {
            advertisementModel.getAllActiveAdvertisements(function(ads) {
                //console.log(types)
                res.render('index', {
                    Advertisements: ads,
                    Items: items,
                    user: req.user,
                    Types: types
                });
            })
        })
    })
}