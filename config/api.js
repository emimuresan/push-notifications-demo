const webPush = require('web-push');

module.exports = function(express, GCM_KEY) {
    'use strict';

    console.log('--------- API WEB-PUSH ---------');

    const router = express.Router();

    // Set Google Cloud Messaging API key which is matched against gcm_sender_id from manifest.json
    webPush.setGCMAPIKey(GCM_KEY);

    router.route('/register').post((req, res) => {
        console.log('endpoint hit: register');

        // A real world application would store the subscription info.
        res.sendStatus(201);
    });

    router.route('/sendNotification').post((req, res) => {
        console.log('endpoint hit: sendNotification');

        setTimeout(() => {
            webPush.sendNotification(req.query.endpoint, {
                TTL: req.query.ttl
            })
                .then(() => {
                    res.sendStatus(201);
                });
        }, req.query.delay * 1000);
    });

    return router;
};

