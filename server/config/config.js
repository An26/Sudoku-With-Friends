module.exports = {
    database: process.env.MONGODB_URI || 'mongodb://localhost/sudoku',
    port: process.env.PORT || 3000,
    jwtSecret: 'This is my cool secret :) :) !?!!'
};
