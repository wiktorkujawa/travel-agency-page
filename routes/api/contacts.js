const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Contact = require('../../models/Contact');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
  Contact.find()
    .sort({ date: -1 })
    .then(contacts => res.json(contacts))
});

// @route POST api/items
// @desc Create an Item
// @access Private
router.put('/:id', auth, (req, res) => {
  Contact.findByIdAndUpdate(req.params.id, {
    workTime: req.body.workTime,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    socialMedia: req.body.socialMedia,
    date: new Date()
  })
    .then(contact => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

module.exports = router;