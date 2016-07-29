console.log('--------- INDEX ---------');

const SERVICE_WORKER = 'service-worker.js';
let endpoint;

const getSubscriptionsPromise = function getSubscriptionsPromise(registration) {
    // Use the PushManager to get the user's subscription to the push service.
    return registration.pushManager.getSubscription()
        .then(function(subscription) {
            if (subscription) {
                return subscription;
            }
            return registration.pushManager.subscribe({userVisibleOnly: true});
        })
        .catch(function(err) {
            console.log(err);
        });
};

const sendSubscriptionDetails = function sendSubscriptionDetails(subscription) {
    endpoint = subscription.endpoint;

    document.getElementById('notification-channel').textContent = endpoint;

    // Send the subscription details to the server using the Fetch API.
    fetch('./register', {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'Content-length': 32
        },
        body: JSON.stringify({
            endpoint: subscription.endpoint
        })
    });
};

// Register a Service Worker.
if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');

    navigator.serviceWorker.register(SERVICE_WORKER)
        .then(getSubscriptionsPromise)
        .then(sendSubscriptionDetails);

    document.getElementById('notification-send-button').onclick = function() {
        let delay = document.getElementById('notification-delay').value;
        let ttl = document.getElementById('notification-ttl').value;

        // Ask the server to send the client a notification. This is for testing purposes
        fetch('./sendNotification?endpoint=' + endpoint + '&delay=' + delay + '&ttl=' + ttl, {
            method: 'post'
        });
    };
} else {
    console.error('Service Worker is not supported');
}