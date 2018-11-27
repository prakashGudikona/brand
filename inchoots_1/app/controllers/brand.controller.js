const brand = require('../models/brand.model.js');

// Create and Save a new brand
exports.create = (req, res) => {
    // Validate request
    if(!req.body.brandName) {
        return res.status(400).send({
            message: "brand should not be empty"
        });
    }

    // Create a brand
    const Brand = new brand({
        brandId: req.body.brandId || "Untitled brand", 
        brandName: req.body.brandName,
        productList: req.body.productList,
        categoryList: req.body.categoryList
    });

    // Save brand in the database
    Brand.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the brand."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    brand.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single findOneBrand with a BrandId
exports.findOne = (req, res) => {
    brand.findById(req.params.brandId)
    .then(brandId => {
        if(!brandId) {
            return res.status(404).send({
                message: "brand not found with the id " + req.params.brandId
            });            
        }
        res.send(brandId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "brand not found with id " + req.params.brandId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Brand with id " + req.params.brandId
        });
    });
};

// Update a Brand identified by the BrandId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.brandId) {
        return res.status(400).send({
            message: "brand brandId can not be empty"
        });
    }

    // Find Brand and update it with the request body
    brand.findByIdAndUpdate(req.params.brandId, {
              brandId: req.body.brandId || "Untitled brand", 
        brandName: req.body.brandName,
        productList: req.body.productList,
        categoryList: req.body.categoryList
    }, {new: true})
    .then(Brand => {
        if(!Brand) {
            return res.status(404).send({
                message: "brand not found with id " + req.params.brandId
            });
        }
        res.send(Brand);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "brand not found with id " + req.params.brandId
            });                
        }
        return res.status(500).send({
            message: "Error updating Brand with id " + req.params.brandId
        });
    });
};

// Delete a Brand with the specified BrandId in the request
exports.delete = (req, res) => {
    brand.findByIdAndRemove(req.params.brandId)
    .then(Brand => {
        if(!Brand) {
            return res.status(404).send({
                message: "brand not found with id " + req.params.brandId
            });
        }
        res.send({message: "brand deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "brand not found with id " + req.params.brandId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Brand with id " + req.params.brandId
        });
    });
};
