const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Content = require('../../models/Content');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
  Content.find()
    .then(contents => res.json(contents))
});

// @route POST api/items
// @desc Create an Item
// @access Private
router.put('/:id', auth, (req, res) => {
  Content.findByIdAndUpdate(req.params.id, { name: req.body.name, date: new Date() })
    .then(content => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

module.exports = router;