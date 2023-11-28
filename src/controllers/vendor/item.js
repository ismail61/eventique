const { findItem, addItem, getItems } = require('../../services/item');
const { addItemValidation, updateItemValidation } = require('../../validations/item');

async function getAllItems(req, res) {
    const items = await getItems({ vendorId: req.vendor?._id });
    return res.status(200).json({ success: true, data: items });
}

async function getItem(req, res) {
    const { id } = req.params;
    const item = await findItem({ _id: id, vendorId: req.vendor?._id });
    if (!item) {
        return res.status(400).json({ success: false, message: 'Invalid Item id' });
    }
    return res.status(200).json({ success: true, data: item });
}


async function updateItem(req, res) {
    try {
        const validation = updateItemValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }
        const { id } = req.params;

        const item = await updateItem({ vendorId: req.vendor?._id, _id: id }, req.body);
        if (!item) {
            return res.status(400).json({ success: false, message: 'Failed to update item info' });
        }
        return res.json({ success: true, data: item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

async function addNewItem(req, res) {
    try {
        const validation = addItemValidation(req.body);
        if (validation.error) {
            return res.status(422).json({ success: false, message: validation.error.details[0].message });
        }
        const item = await addItem({
            ...req.body,
            vendorId: req.vendor?._id,
        });
        if (!item) {
            return res.status(400).json({ success: false, message: 'Failed to add new item' });
        }
        return res.json({ success: true, data: item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

module.exports = { getAllItems, getItem, updateItem, addNewItem };
