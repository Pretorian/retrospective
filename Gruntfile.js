'use strict';

module.exports = function (grunt) {

    var path = require('path');

    // Configurable paths.
    var config = require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'tasks'),
        init: false
    });

    // Time how long tasks take. Can help when optimizing build times.
    require('time-grunt')(grunt);

    grunt.registerTask('default', [
        'build'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'clean',
        'browserify',
        'stylus',
        'concat:css',
        'cssmin',
        'uglify',
        'copy:dist'
    ]);

    // Pass paths and details to the config variable
    config.env = process.env;
    config.pkg = grunt.file.readJSON('package.json');
    config.cfg = {
        assets: 'app/assets',
        bower: 'app/assets/bower_components',
        build: '.build',
        dist: 'public'
    };

    // init the config
    grunt.initConfig(config);
};
