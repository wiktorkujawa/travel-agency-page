const router = require('express').Router();
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

const collectionName = 'insurances';
const bucketName = 'insurances';

const storage = initStorage(conn, bucketName);

const upload = initUpload(storage);


// Item Model
const Insurance = require('../../models/Insurance');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
  Insurance.find()
    .sort({ date: -1 })
    .then(insurances => res.json(insurances))
});


// @route PUT /insurances/:id
// @desc  Update file and object
router.put('/:id', upload.any(), (req, res) => {
  const files_id = req.params.id
  if (req.files !== undefined) {
    const { files } = req;
    const { id, filename } = files[0];
    Insurance.findOneAndUpdate({ files_id: files_id }, {
      files_id: id,
      image: '/api/insurances/image/' + filename,
      name: req.body.name,
      date: new Date()
    })
      .then(insurance => res.json({ msg: 'Updated successfully' }))
      .then(gfs.remove({ _id: files_id, root: 'insurances' }, (err, gridFSBucket) => {
        if (err) {
          return res.status(404).json({ err: err });
        }
      }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  }
  else {
    Insurance.findOneAndUpdate({ files_id: files_id }, {
      name: req.body.name,
      date: new Date()
    })
      .then(insurance => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  }
});

router.post('/', upload.single('insurance'), (req, res) => {
  if (req.file !== undefined) {
    const newOffer = new Insurance({
      files_id: req.file.id,
      image: '/api/insurances/image/' + req.file.filename,
      name: req.body.name,
      // Grab the file id that was stored in the database by the storage engine as the reference to your file
    })
    newOffer.save().then(insurance => res.json(insurance));
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
    // File exists
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

module.exports = router;