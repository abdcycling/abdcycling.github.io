/*!
 * Athletes By Design Website Gruntfile
 * http://www.abdcycling.com/
 * Copyright 2014 Athletes By Design
 * Licensed under CC-BY-SA-4.0 (http://creativecommons.org/licenses/by-sa/4.0/legalcode)
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Athletes By Design v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2014 <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',
    uglify: {
      options: {
        preserveComments: 'some'
      },
      plusgallery: {
        src: '_assets/js/plusgallery.js',
        dest: 'assets/js/plusgallery.min.js'
      }
    },
    less: {
      core: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: '_assets/css/<%= pkg.name %>.css.map',
          paths: ["_assets/bootstrap-v3/less"]
        },
        files: {
          '_assets/css/<%= pkg.name %>.css': '_assets/less/<%= pkg.name %>.less'
        }
      },
      plusgallery: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'plusgallery.css.map',
          sourceMapFilename: '_assets/css/plusgallery.css.map',
        },
        files: {
          '_assets/css/plusgallery.css': '_assets/less/plusgallery.less'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      core: {
        options: {
          map: true
        },
        src: '_assets/css/<%= pkg.name %>.css'
      },
      plusgallery: {
        options: {
          map: true
        },
        src: '_assets/css/plusgallery.css'
      }
    },
    csslint: {
      options: {
        csslintrc: '_assets/less/.csslintrc'
      },
      src: [
        '_assets/css/<%= pkg.name %>.css',
        '_assets/css/plusgallery.css'
      ]
    },
    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*'
      },
      core: {
        src: '_assets/css/<%= pkg.name %>.css',
        dest: 'assets/css/<%= pkg.name %>.min.css'
      },
      plusgallery: {
        src: '_assets/css/plusgallery.css',
        dest: 'assets/css/plusgallery.min.css'
      }
    },
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      files: {
        src: '_assets/css/<%= pkg.name %>.css'
      }
    },
    csscomb: {
      options: {
        config: '_assets/less/.csscomb.json'
      },
      core: {
        expand: true,
        cwd: '_assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: '_assets/css/'
      }
    },
    copy: {
      fonts: {
        expand: true,
        cwd: process.env.HOME + '_assets/bootstrap-v3/dist/fonts/',
        src: 'glyphicons-*',
        dest: 'assets/fonts/'
      }
    }
  });
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);
  grunt.registerTask('dist-js', ['uglify']);
  grunt.registerTask('less-compile', ['less:core', 'less:plusgallery']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer', 'usebanner', 'csscomb', 'cssmin']);
  grunt.registerTask('default', ['dist-js', 'dist-css', 'copy:fonts']);
};
