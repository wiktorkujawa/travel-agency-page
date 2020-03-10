const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Question Model
const Question = require('../../models/Question');

// @route GET api/items
// @desc Get All Questions
// @access Public
router.get('/', (req, res) => {
  Question.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

// @route POST api/items
// @desc Create an Question
// @access Private
router.post('/', auth, (req, res) => {
  const newQuestion = new Question({
    question: req.body.question,
    answer: req.body.answer
  });
  newQuestion.save().then(item => res.json(item));
});

// @route DELETE api/items:id
// @desc Delete an Question
// @access Private
router.delete('/:id', auth, (req, res) => {
  Question.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});


router.put('/:id', auth, (req, res) => {
  Question.findByIdAndUpdate(req.params.id, { question: req.body.question, answer: req.body.answer, date: new Date() })
    .then(item => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});



module.exports = router;