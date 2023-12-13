const express = require('express');
const router = express.Router();
const auth = require('../midlewhere/authentication');
const api = require('../controlers/api');

// Collection
router.use('/collection', auth);
router.post('/collection', api.addToCollection);
router.get('/collection', api.displayCollection);
router.delete('/collection/:id', api.deleteToCollection);

// WishList
router.use('/wishlist', auth);
router.post('/wishlist', api.addToWishList);
router.get('/wishlist', api.displayWishList);
router.delete('/wishlist/:id', api.deleteToWishList)

router.use('/profil', auth);
router.get('/profil', api.getProfilInformation);
router.put('/profil', api.updateProfil);
router.delete('/profil', api.deleteProfil);
router.put('/profil/password', api.changePassword);

module.exports = router;