const { findCart, deleteCart, addItemInCart, incrementItemInCart, addCart, deleteItem } = require('../../services/cart');
const { findItem} = require('../../services/item');
const { addToCartValidation, deleteCartItemValidation } = require('../../validations/item');

async function addToCart(req, res) {
    try {
        const validation = addToCartValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }
        const { itemId, quantity } = req.body;
        const checkValidItem = await findItem({ _id: itemId });
        if (!checkValidItem || checkValidItem?.quantity < 1 || checkValidItem?.quantity < quantity) {
            return res.status(400).json({ success: false, message: 'Invalid Item id or quantity mismatch' });
        }
        //check existing cart
        const isExistCart = await findCart({ userId: req.user?._id });
        if (!isExistCart) {
            const cart = await addCart({ userId: req.user?._id, items: [{ id: itemId, quantity }] });
            return res.json({ success: true, data: cart });
        }

        //check existing cart item
        const isExistItem = await findCart({ userId: req.user?._id, 'items.id': itemId });
        if (!isExistItem) {
            const cart = await addItemInCart(req.user?._id, { id: itemId, quantity });
            return res.json({ success: true, data: cart });
        }

        const cart = await incrementItemInCart(req.user?._id, itemId, quantity);
        if (!cart) {
            return res.status(400).json({ success: false, message: 'Failed to add to cart' });
        }
        return res.json({ success: true, data: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function getUserCart(req, res) {
    try {
        const cart = await getCart({ userId: req.user?._id });
        if (!cart) {
            return res.status(400).json({ success: false, message: 'Cart Not Found' });
        }
        return res.json({ success: true, data: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function deleteUserCart(req, res) {
    try {
        const cart = await deleteCart({ userId: req.user?._id, id: req.params.id });
        if (!cart) {
            return res.status(400).json({ success: false, message: 'Failed to delete a user cart' });
        }
        return res.json({ success: true, data: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function deleteCartItem(req, res) {
    try {
        const validation = deleteCartItemValidation(req.params);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }
        const cart = await deleteItem(req.params.itemId, req.user?._id);
        if (!cart) {
            return res.status(400).json({ success: false, message: 'Failed to delete cart item' });
        }
        return res.json({ success: true, data: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = { addToCart, getUserCart, deleteUserCart, deleteCartItem };
