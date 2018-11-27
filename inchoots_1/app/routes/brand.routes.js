module.exports = (app) => {
    const brand = require('../controllers/brand.controller.js');

    // Create a new brand
    app.post('/brand', brand.create);

    // Retrieve all brand
    app.get('/brand', brand.findAll);

    // Retrieve a single brand with brandId
    app.get('/brand/:brandId', brand.findOne);

    // Update a brand with brandId
    app.put('/brand/:brandId', brand.update);

    // Delete a brand with brandId
    app.delete('/brand/:brandId', brand.delete);
}