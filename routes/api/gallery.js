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

const collectionName = 'photos';
const bucketName = 'photos';

const storage = initStorage(conn, bucketName);

const upload = initUpload(storage);


// File Model
const Gallery = require('../../models/Gallery');

// @route GET /
// @desc Loads form
router.get('/', (req, res) => {


  Gallery.find()
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
router.post('/', upload.array('photo'), async (req, res, next) => {
  if (req.files !== undefined) {
    await Promise.all(req.files.map(({ id, filename }) => {
      const newGallery = new Gallery({
        files_id: id,
        image: '/api/gallery/image/' + filename,
        description: req.body.description,
        tripLocation: req.body.tripLocation,
      })
      return newGallery.save()
    })).then(data => res.json(data))
      .catch(err => next(err))
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

// @route DELETE /photos/:id
// @desc  Delete file and object
router.delete('/:id', auth, (req, res) => {
  const files_id = req.params.id
  Gallery.findOneAndDelete({ files_id: files_id })
    .then(() => res.json({ success: true }))
    .then(gfs.remove({ _id: files_id, root: 'photos' }, (err, gridFSBucket) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    }))
    .catch(err => res.status(404).json({ success: false }));

});

// @route PUT /photos/:id
// @desc  Update file and object
router.put('/:id', (req, res) => {
  Gallery.findByIdAndUpdate(req.params.id, {
    description: req.body.description,
    tripLocation: req.body.tripLocation,
    date: new Date()
  })
    .then(photo => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
}
);

module.exports = router;