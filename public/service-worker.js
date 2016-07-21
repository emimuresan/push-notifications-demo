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

const getRandomArbitrary = function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
};

self.addEventListener('push', function(event) {
    let index = getRandomArbitrary(0,5);

    event.waitUntil(
        self.registration.showNotification('Push Notification', {
            body: (PROGRAMMING_QUOTES[index]) || 'Test',
            icon: 'img/monkey.png',
            vibrate: [500, 100, 500],
        })
    );
});