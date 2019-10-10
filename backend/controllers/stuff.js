//To make our structure even more modular, and our code easier to read and to maintain,
// we are going to separate our routes' business logic into controllers.

const Thing = require('../models/thing');

const fs = require('fs');

// exports.createThing = (req, res, next) => {
//     const thing = new Thing({
//         title: req.body.title,
//         description: req.body.description,
//         imageUrl: req.body.imageUrl,
//         price: req.body.price,
//         userId: req.body.userId
//     });
//     thing.save().then(
//         () => {
//             res.status(201).json({
//                 message: 'Post saved successfully!'
//             });
//         }
//         ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             })
//         }
//     )
// };

exports.createThing = (req, res, next) => {
    req.body.thing = JSON.parse(req.body.thing);
    const url = req.protocol + '://' + req.get('host');
    const thing = new Thing({
        title: req.body.thing.title,
        description: req.body.thing.description,
        imageUrl: url + '/images/' + req.file.filename,
        price: req.body.thing.price,
        userId: req.body.thing.userId
    });
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneThing =  (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

// exports.modifyThing = (req, res, next) => {
//     const thing = new Thing({
//         _id: req.params.id,
//         title: req.body.title,
//         description: req.body.description,
//         imageUrl: req.body.imageUrl,
//         price: req.body.price,
//         userId: req.body.userId
//     });
//     Thing.updateOne({_id: req.params.id}, thing).then(
//         () => {
//             res.status(201).json({
//                 message: 'Thing updated successfully!'
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// };
exports.modifyThing = (req, res, next) => {
    let thing = new Thing({ _id: req.params._id });
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        req.body.thing = JSON.parse(req.body.thing);
        thing = {
            _id: req.params.id,
            title: req.body.thing.title,
            description: req.body.thing.description,
            imageUrl: url + '/images/' + req.file.filename,
            price: req.body.thing.price,
            userId: req.body.thing.userId
        };
    } else {
        thing = {
            _id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            userId: req.body.userId
        };
    }
    Thing.updateOne({_id: req.params.id}, thing).then(
        () => {
            res.status(201).json({
                message: 'Thing updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

// exports.deleteThing = (req, res, next) => {
//     Thing.deleteOne({_id: req.params.id}).then(
//         () => {
//             res.status(200).json({
//                 message: 'Deleted!'
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// };
exports.deleteThing = (req, res, next) => {
    Thing.findOne({_id: req.params.id}).then(
        (thing) => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Thing.deleteOne({_id: req.params.id}).then(
                    () => {
                        res.status(200).json({
                            message: 'Deleted!'
                        });
                    }
                ).catch(
                    (error) => {
                        res.status(400).json({
                            error: error
                        });
                    }
                );
            });
        }
    );
};

exports.getAllStuff = (req, res, next) => {
    // const stuff = [
    //     {
    //         _id: 'oeihfzeoi',
    //         title: 'My first thing',
    //         description: 'All of the info about my first thing',
    //         imageUrl: 'https://picsum.photos/id/237/200/300',
    //         price: 4900,
    //         userId: 'qsomihvqios',
    //     },
    //     {
    //         _id: 'oeihfzeomoihi',
    //         title: 'My second thing',
    //         description: 'All of the info about my second thing',
    //         imageUrl: 'https://picsum.photos/seed/picsum/200/300',
    //         price: 2900,
    //         userId: 'qsomihvqios',
    //     },
    // ];
    // res.status(200).json(stuff);
    Thing.find().then(
        (things) => {
            res.status(200).json(things);
        })
        .catch(
            (error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
};
