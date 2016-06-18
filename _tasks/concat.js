// Concat tasks.
module.exports = {
    options: {
        nonull: true,
    },
    css: {
        src: [
            '<%= cfg.bower %>/components-font-awesome/css/font-awesome.css',
            '<%= cfg.build %>/stylesheets/app.css'
        ],
        dest: '<%= cfg.dist %>/stylesheets/app.css'
    },
};
