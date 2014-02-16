/**
 * Created by Mike Britton on 01/22/14.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: ['index.html', './js/DisqusElements.js'],
            tasks: ['build']
        },
        clean: [
            'dist/css',
            'dist/js'
        ],
        concat: {
            js: {
                src: [
                    'src/js/DisqusElements.js'
                ],
                dest: 'src/js/DisqusElements.js'
            },
            css: {
                src: [
                    'src/css/main.css',
                    'src/css/DisqusElements.css',
                ],
                dest: 'src/css/styles.css'
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'archive.zip'
                },
                files: [
                    {src: ['./**'], dest: '/archive/'}
                ]
            }
        },
        copy: [
            {
                src: ['src/index.html'],
                dest: 'dist/'
            },
            {
                src: ['src/js/DisqusElements.js'],
                dest: 'dist/'
            },
            {
                src: ['src/css/styles.css'],
                dest: 'dist/'
            }
        ]

    });

    // Install with node: npm install grunt-thing-name --save-dev
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-ftp-deploy');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('archive', ['compress']);
    grunt.registerTask('deploy', ['clean', 'concat', 'copy', 'ftp-deploy']);
    grunt.registerTask('build', ['clean', 'concat', 'copy']);
    grunt.registerTask('default', ['clean', 'concat', 'copy']);

};