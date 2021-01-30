const router = require('express').Router();
const URL = require('../models/url');

router.route('/').get((req,res) => 
{
    const shortenedURL = req.body.url;
    try
    {
        const id = shortenedURL.split('.com/')[1];
        const longURL = URL.findById(id);
        if(!longURL) res.status(400).json({err: 'No such URL'});
        return res.json(longURL);
    }
    catch(e)
    {
        return res.status(500).json({err: e.message});
    }
});

module.exports = router;