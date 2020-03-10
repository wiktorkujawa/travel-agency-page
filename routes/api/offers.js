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

const collectionName = 'offers';
const bucketName = 'offers';

const storage = initStorage(conn, bucketName);

const upload = initUpload(storage);


// File Model
const Offer = require('../../models/Offer');

// @route GET /
// @desc Loads form
router.get('/', (req, res) => {


  Offer.find()
    .sort({ date: 1 })
    .then(slides => res.json(slides))
});

// @route GET /files
// @desc  Display all files in JSON
// router.get('/files', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       return res.status(404).json({
//         err: 'No files exist'
//       });
//     }

//     // Files exist
//     return res.json(files);
//   });
// });

// @route POST /upload
// @desc  Uploads file and object to DB
router.post('/', upload.single('offer'), (req, res) => {
  if (req.file !== undefined) {
    const newOffer = new Offer({
      files_id: req.file.id,
      image: '/api/offers/image/' + req.file.filename,
      title: req.body.title,
      arrivalDate: req.body.arrivalDate,
      arrivalTime: req.body.arrivalTime,
      price: req.body.price,
      tripLocation: req.body.tripLocation,
      type: req.body.type,
      description: req.body.description
      // Grab the file id that was stored in the database by the storage engine as the reference to your file
    })
    newOffer.save().then(offer => res.json(offer));
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

// @route DELETE /offers/:id
// @desc  Delete file and object
router.delete('/:id', auth, (req, res) => {
  const files_id = req.params.id
  Offer.findOneAndDelete({ files_id: files_id })
    .then(() => res.json({ success: true }))
    .then(gfs.remove({ _id: files_id, root: 'offers' }, (err, gridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    }))
    .catch(err => res.status(404).json({ success: false }));

});

// @route PUT /offers/:id
// @desc  Update file and object
router.put('/:id', upload.any(), (req, res) => {
  const files_id = req.params.id
  if (req.files !== undefined) {
    const { files } = req;
    const { id, filename } = files[0];
    Offer.findOneAndUpdate({ files_id: files_id }, {
      files_id: id,
      image: '/api/offers/image/' + filename,
      title: req.body.title,
      arrivalDate: req.body.arrivalDate,
      arrivalTime: req.body.arrivalTime,
      price: req.body.price,
      tripLocation: req.body.tripLocation,
      type: req.body.type,
      description: req.body.description,
      date: new Date()
    })
      .then(offer => res.json({ msg: 'Updated successfully' }))
      .then(gfs.remove({ _id: files_id, root: 'offers' }, (err, gridFSBucket) => {
        if (err) {
          return res.status(404).json({ err: err });
        }
      }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  }
  else {
    Offer.findOneAndUpdate({ files_id: files_id }, {
      title: req.body.title,
      arrivalDate: req.body.arrivalDate,
      arrivalTime: req.body.arrivalTime,
      price: req.body.price,
      tripLocation: req.body.tripLocation,
      type: req.body.type,
      description: req.body.description,
      date: new Date()
    })
      .then(offer => res.json({ msg: 'Updated successfully' }))
      .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
      );
  }
});

module.exports = router;