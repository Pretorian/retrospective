var reactify = require('reactify');
var templatify = require('react-templatify');

// Browserify is a tool for taking your CommonJS-style Javascript code and packaging it for use in the browser.
module.exports = {
    dist: {
        options: {
            banner: '/*! @generated */',
            transform: [reactify, templatify],
            extensions: ['.jsx','.rt']
        },
        files: {
            '<%= cfg.dist %>/javascripts/app.js': '<%= cfg.assets %>/javascripts/app.jsx'
        }
    }
};
