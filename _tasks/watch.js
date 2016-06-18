// Watches files for changes and runs tasks based on the changed files
module.exports = {
    js: {
        files: ['<%= cfg.assets %>/javascripts/**/*.{js,jsx,rt}'],
        tasks: ['jshint', 'browserify']
    },
    gruntfile: {
        files: ['Gruntfile.js', 'tasks/*.js'],
        tasks: ['copy']
    },
    styles: {
        files: ['<%= cfg.assets %>/stylesheets/**/*.{css,styl}'],
        tasks: ['stylus', 'concat:css']
    }
};
