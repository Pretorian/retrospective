// Minimize styles. We are going to concat every css file in
// dist and make it a single file.
module.exports = {
    dist: {
        files: {
            '<%= cfg.dist %>/stylesheets/app.css': ['<%= cfg.dist %>/stylesheets/**/*.css'],
        },
    },
};
