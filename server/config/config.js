module.exports = {
    database: process.env.MONGODB_URL || 'mongodb://localhost/sudoku',
    port: process.env.PORT || 3000,
};
