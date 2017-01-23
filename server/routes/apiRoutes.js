module.exports = (app) => {
    const users = require('./../controllers/usersControllers');

    app.get('/user', users.self);
    // app.get('/user/:id', users.get);
    // app.put('/user/:id', users.update);
    app.post('/user', users.create);
};