const router = require("express").Router();
const Phones = require("../models/Phone");
const { Types: { ObjectId } } = require('mongoose');

router.get('/', async (req, res) => {
    try {
        const phones = await Phones.find();
        res.json({Status: true, phones});
        // console.log(phones);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})
router.post('/delete', async (req, res) => {
    try {
        const {id} = req.body;
        const phones = await Phones.findByIdAndDelete({_id: id});
        console.log(phones);
        res.json({Status: true});
        // console.log(phones);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router;
