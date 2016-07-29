console.log('--------- SERVICE WORKER ---------');

const PROGRAMMING_QUOTES = [
    'Walking on water and developing software from a specification are easy if both are frozen.',
    'They don\'t make bugs like Bunny anymore.',
    'The object-oriented version of "Spaghetti code" is, of course, "Lasagna code".',
    'A C program is like a fast dance on a newly waxed dance floor by people carrying razors.',
    'In theory, theory and practice are the same. In practice, they’re not.',
    'My software never has bugs. It just develops random features.',
    'The only problem with troubleshooting is that sometimes trouble shoots back.',
    'Computer language design is just like a stroll in the park. Jurassic Park, that is.'
];
let num = 1;

const getRandomArbitrary = function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
};

self.addEventListener('push', function(event) {
    console.log(event);

    let index = getRandomArbitrary(0,5);
    let payload = event.data ? event.data.text() : PROGRAMMING_QUOTES[index];
    let title = 'Push Notification ' + num++;

    // This method takes a promise and extends the lifetime of the event handler until, in this case,
    // the promise returned by showNotification() is resolved.
    event.waitUntil(
        self.registration.showNotification(title, {
            body: payload,
            // One notification will be shown for each tag value: if a new push message is received, the old notification will be replaced
            tag: 'swc',
            icon: 'img/monkey.png',
            vibrate: [500, 100, 500],
            actions: [
                {title: 'Like', icon: 'img/heart.png', action: 'like'},
                {title: 'Share', icon: 'img/chat.png', action: 'share'},
            ]
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();

    const url1 = 'https://media.giphy.com/media/Ay0xWZJg7biog/giphy.gif';
    const url2 = 'https://media.giphy.com/media/F7Jm8U4J8SZMY/giphy.gif';

    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
            .then(function(windowClients) {
                // This code checks all window clients for this service worker:
                // if the requested URL is already open in a tab, focus on it - otherwise open a new tab for it.
                for (let i = 0; i < windowClients.length; i++) {
                    let client = windowClients[i];
                    if ((client.url === url1 || client.url === url2) && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    if (event.action === 'like') {
                        return clients.openWindow(url1);
                    } else if (event.action === 'share') {
                        return clients.openWindow(url2);
                    }
                }
            })
    );

}, false);