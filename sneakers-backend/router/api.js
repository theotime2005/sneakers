const express = require('express');
const router = express.Router();
const auth = require('../midlewhere/authentication');
const api = require('../controlers/api');

// Collection
router.post('/collection', auth, api.addToCollection);
router.get('/collection/:id', api.displayCollection);
router.delete('/collection/:id', auth, api.deleteToCollection);

// WishList
router.use('/wishlist', auth);
routerpost('/wishlist', api.addToWishList);
router.get('/wishlist', api.displayWishList);
router.delete('/wishlist/:id', api.deleteToWishList)

module.exports = router;