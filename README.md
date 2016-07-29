# Web Push Notifications Demo

This is just a quick demo showing how to register for push notifications and how to send them. 
I created it for learning purposes... I wanted to play around with push notifications on the web and service workers :)

Backend is a node + express app. I'm using the [Web Push library](https://github.com/web-push-libs/web-push) for Node.js.

Prerequisite:
* Create a project from the [Google Developers Console](https://console.cloud.google.com/start).
See https://developers.google.com/web/fundamentals/getting-started/push-notifications/step-04?hl=en for more details.
* Create a file called _manifest.json_ with the following data:

```
{
  "name": "<PROJECT NAME>",
  "start_url": "./",
  "gcm_sender_id": "<PLACE YOUR PROJECT NUMBER HERE>",
  "gcm_user_visible_only": true
}
```

* Set your project's GCM_API_KEY as an environment variable.

Start the server:

```
node app.js
``` 

or 

```
nodemon app.js
``` 
(with nodemon the process will automatically restart when the code changes).

Reading material:
* https://developers.google.com/web/fundamentals/getting-started/push-notifications/?hl=en
* https://serviceworke.rs/push-simple.html
* https://notifications.spec.whatwg.org

Awesome talk on Deep Engagement with Push Notifications:
* https://youtu.be/Zq-tRtBN3ws
