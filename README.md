# Web Push Notifications Demo

This is just a quick demo showing how to register for push notifications and how to send them. 
I created it for learning purposes... I wanted to play around with push notifications on the web and service workers :)

Backend is a node + express app. I'm using the [Web Push library](https://github.com/web-push-libs/web-push) for Node.js.

Start:

```
nodemon app.js
```

Note: manifest.json not included, see links below.

Helpful links:
* https://console.cloud.google.com/start (to create a project and get a GCM_API_KEY)
* https://developers.google.com/web/fundamentals/getting-started/push-notifications/?hl=en
* https://serviceworke.rs/push-simple.html

Awesome talk on Deep Engagement with Push Notifications:
* https://youtu.be/Zq-tRtBN3ws
