const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

// Make sure you place the POST route above the middleware for GET requests, as the GET logic will currently intercept
// all requests to your  /api/stuff  endpoint — placing the POST route beforehand
// will intercept POST requests, preventing them from reaching the GET middleware.

// app.post('/api/stuff', (req, res, next) => {
//     console.log(req.body);
//     //request will time-out if we don't send a request
//     res.status(201).json({
//         message: "Thing created successfully"
//     });
// });

//this makes our router file easier to understand.  It is clear which routes are available at which endpoints and the descriptive names given to our controller
// functions make it easier to understand what each route does.
router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/',auth, multer, stuffCtrl.createThing);
router.get('/:id',auth, stuffCtrl.getOneThing);
router.put('/:id',auth, multer, stuffCtrl.modifyThing);
router.delete('/:id',auth, stuffCtrl.deleteThing);

module.exports = router;
