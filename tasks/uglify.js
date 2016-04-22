// Minimize scripts.
module.exports = {
    options: {
        banner: '/*! @generated */\n',
        preserveComments: 'some',
    },
    dist: {
        files: {
            '<%= cfg.dist %>/javascripts/app.js': [
                '<%= cfg.dist %>/javascripts/app.js'
            ]
        }
    }
};
