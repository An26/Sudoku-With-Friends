module.exports = (app) => {
    const users = require('./../controllers/usersControllers');
    const games = require('./../controllers/gamesControllers');

    app.get('/user', users.self);
    app.get('/user/:id', users.get);
    // app.put('/user/:id', users.update);
    app.post('/user', users.create);

    app.get('/api/game', games.list);
    app.get('/api/game/:id', games.get);
    app.post('/api/game', games.create);
    app.put('/api/game/:id/join', games.join);
    app.put('/api/game/:id/update', games.update);
};