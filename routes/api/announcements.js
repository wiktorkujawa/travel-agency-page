const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Announcement Model
const Announcement = require('../../models/Announcement');

// @route GET api/items
// @desc Get All Announcements
// @access Public
router.get('/', (req, res) => {
  Announcement.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

// @route POST api/items
// @desc Create an Announcement
// @access Private
router.post('/', auth, (req, res) => {
  const newAnnouncement = new Announcement({
    name: req.body.name,
    content: req.body.content
  });
  newAnnouncement.save().then(item => res.json(item));
});

// @route DELETE api/items:id
// @desc Delete an Announcement
// @access Private
router.delete('/:id', auth, (req, res) => {
  Announcement.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});


router.put('/:id', auth, (req, res) => {
  Announcement.findByIdAndUpdate(req.params.id, { name: req.body.name, content: req.body.content, date: new Date() })
    .then(item => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});



module.exports = router;