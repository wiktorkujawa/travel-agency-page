const router = require('express').Router();
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { initStorage, initUpload } = require('../../modules/multerModule');

const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db);
  gfs.collection(collectionName);
});

const collectionName = 'slides';
const bucketName = 'slides';

const storage = initStorage(conn, bucketName);

const upload = initUpload(storage);


// Slide Model
const Slide = require('../../models/Slide');

// @route GET /
// @desc Loads form
router.get('/', (req, res) => {
  Slide.find()
    .sort({ date: 1 })
    .then(slides => res.json(slides))
});
// @route POST /upload
// @desc  Uploads file to DB
router.post('/', upload.single('slide'), (req, res) => {
  if (req.file !== undefined) {
    const newSlide = new Slide({
      files_id: req.file.id,
      src: '/api/slides/image/' + req.file.filename,
      header: req.body.header,
      caption: req.body.caption
      // Grab the file id that was stored in the database by the storage engine as the reference to your file
    })
    newSlide.save().then(item => res.json(item));
  }
});

// @route GET /files/:filename
// @desc  Display single file object
router.get('/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // Slide exists
    return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
router.delete('/:id', auth, (req, res) => {
  const files_id = req.params.id
  Slide.findOneAndDelete({ files_id: files_id })
    .then(() => res.json({ success: true }))
    .then(gfs.remove({ _id: files_id, root: 'slides' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    }))
    .catch(err => res.status(404).json({ success: false }));

});

// @route PUT /photos/:id
// @desc  Update file and object
router.put('/:id', (req, res) => {
  Slide.findByIdAndUpdate(req.params.id, {
    header: req.body.description,
    caption: req.body.tripLocation,
    date: new Date()
  })
    .then(slide => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
}
);

module.exports = router;