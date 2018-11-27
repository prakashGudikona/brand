const mongoose = require('mongoose');
const brandSchema = mongoose.Schema({
    brandId: String,
    brandName: String,
    productList: String,
    categoryList: String
});
module.exports = mongoose.model('brand', brandSchema);