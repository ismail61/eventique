const { findItem, getItems } = require('../../services/item');

async function getAllItems(req, res) {
    const items = await getItems({});
    return res.status(200).json({ success: true, data: items });
}

async function getItem(req, res) {
    const { id } = req.params;
    const item = await findItem({ _id: id });
    if (!item) {
        return res.status(400).json({ success: false, message: 'Invalid Item id' });
    }
    return res.status(200).json({ success: true, data: item });
}

module.exports = { getAllItems, getItem };
