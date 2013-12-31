module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-recess');
    
    grunt.initConfig({
        concat: {
            less: {
                src: ['less/utils/reset.less', 'less/**/!(reset).less'],
                dest: 'tmp/dist.less'
            }
        },
        less: {
            dev: {
                files: {
                    'css/style.css': 'tmp/dist.less'
                }
            },
            prd: {
                options: {
                    cleancss: true
                },
                files: {
                    'css/style.css': 'tmp/dist.less'
                }
            }
        },
        recess: {
            app: {
                src: ['tmp/dist.less']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            client: [
                'Gruntfile.js',
                'js/src/**/*.js',
                'js/src/*.js'
            ]
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'js/src',
                    name: 'main',
                    mainConfigFile: 'js/src/config.js',
                    include: ['requireLib'],
                    insertRequire: [
                        'main'
                    ],
                    out: 'js/dist/main.js',
                    preserveLicenseComments: false
                }
            }
        },
        clean: {
            tmp: ['tmp']
        },
        watch: {
            clientJS: {
                files: [
                    'js/src/**/*.js',
                    'js/src/*.js'
                ],
                tasks: ['jshint']
            },
            otherJS: {
                files: ['Gruntfile.js'],
                tasks: ['jshint']
            },
            less: {
                files: ['less/**/*.less'],
                tasks: [
                    'concat:less',
                    'recess:app',
                    'less:dev',
                    'clean:tmp'
                ]
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'concat:less',
        'recess',
        'less:dev',
        'less:prd',
        'requirejs',
        'clean:tmp'
    ]);
};