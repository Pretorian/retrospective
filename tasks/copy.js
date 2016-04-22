// Copies remaining files to places other tasks can use.
module.exports = {
    dist: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= cfg.assets %>',
            dest: '<%= cfg.dist %>',
            src: [
                '*.{ico,png,txt}',
                '**/*.html',
                'images/**/*.*',
                'styles/fonts/**/*.*',
                'files/**/*.*',
            ]
        }, {
            expand: true,
            dot: true,
            cwd: '<%= cfg.assets %>/bower_components/components-font-awesome',
            src: ['fonts/*.*'],
            dest: '<%= cfg.dist %>'
        }]
    },
};
