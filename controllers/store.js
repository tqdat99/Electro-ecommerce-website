var productModel = require('../models/product')

module.exports.productList = function(req, res) {
    var perPage = 9
    var page = req.params.page || 1

    type = []
    brand = []
    var order = 'asc'
    var page = 1

    console.log(req)
    console.log(req.query.type)
    console.log(req.query.brand)


    if (req.params['type'] != undefined) {
        type.push(req.params['type'])
    }
    if (req.query.type != undefined) {
        console.log("type: " + req.query.type.length)
        if (!Array.isArray(req.query.type))
            type.push(req.query.type)
        else
            type = req.query.type
    }

    if (req.params['brand'] != undefined) {
        brand.push(req.params['brand'])
    }
    if (req.query.brand != undefined) {
        console.log("brand: " + req.query.brand.length)
        if (!Array.isArray(req.query.brand))
            brand.push(req.query.brand)
        else
            brand = req.query.brand
    }

    if (req.params['order'] != undefined)
        order = req.params['order']
    if (req.query.order != undefined)
        order = req.query.order

    if (req.params['page'] != undefined)
        page = req.params['page']
    if (req.query.page != undefined)
        order = req.query.page

    console.log("controller:")
    console.log(type)
    console.log(brand)


    productModel.getProductList(type, brand, order, function(items) {
        // console.log(page + "," + items.length + "," + perPage + "," + Math.ceil(items.length / perPage))
        // console.log(items)
        onPageItems = items.slice(perPage * (page - 1), perPage * (page - 1) + 9)
            // console.log(onPageItems)
        res.render('store', {
            Items: onPageItems,
            Type: type,
            Brand: brand,
            Order: order,
            Page: page,
            user: req.user,
            current: page,
            pages: Math.ceil(items.length / perPage)
        });
    })
}

module.exports.productDetailById = function(req, res) {
    productModel.getProductDetailById(req.params['id'], function(item) {
        if (item.rows.length > 0) {
            productModel.getRelatedItems(item.rows[0].loai, function(items) {
                res.render('product-details', {
                    item: item.rows[0],
                    Items: items,
                    user: req.user
                });
            })
        }
    })
}