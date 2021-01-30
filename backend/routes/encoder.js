const router = require('express').Router();
const URL = require('../models/url');

router.route('/').post((req, res) => {
    console.log(req.body);
    console.log('URL: ' + req.body.url);

    if (!isValidURL(req.body.url)) return res.status(400).json({ err: 'Invalid URL' });

    const newURL = new URL({ url: req.body.url });
    newURL.save()
        .then(() => {
            res.json({ _id: newURL._id })
        });
});

module.exports = router;

