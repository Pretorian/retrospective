// Less-ify files
module.exports = {
    dist: {
        options: {
            paths: ['<%= cfg.bower %>'],
        },
        files: {
            '<%= cfg.build %>/stylesheets/app.css': '<%= cfg.assets %>/stylesheets/main.styl',
        },
    },
};
