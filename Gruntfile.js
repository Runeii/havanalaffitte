module.exports = function(grunt) {

    var autoprefixer = require('autoprefixer-core');

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Concatenate JavaScript files
        concat: {
            dist: {
                src: [ 'js/jquery.min.js', 'js/libs/*.js','js/global.js'],
                dest: 'js/build/production.js',
            }
        },

        // Minify JavaScript files
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'public/js/production.min.js'
            }
        },

        // Compile Sass to CSS
        ['dart-sass']: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/css/style.css': 'scss/styles.scss'
                }
            }
        },

        // Add vendor prefixes to CSS rules
        postcss: {
            options: {
                processors: [
                    autoprefixer({ browsers: ['last 2 version'] }).postcss
                ]
            },
            dist: { src: 'public/css/*.css' }
        },


        // Run predefined tasks whenever watched files are changed
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['dart-sass', 'postcss'],
                options: {
                    spawn: false,
                }
            },
        },
    });

    // Load project plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-dart-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Default tasks
    grunt.registerTask('default', [
        'concat',
        'uglify',
        'dart-sass',
        'postcss',
    ]);
};
