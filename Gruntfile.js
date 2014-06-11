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
    less: {
      core: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: '_assets/css/<%= pkg.name %>.css.map',
          paths: ["/home/nixternal/mystuff/dev/src/bootstrap/less"]
        },
        files: {
          '_assets/css/<%= pkg.name %>.css': '_assets/less/<%= pkg.name %>.less'
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
      }
    },
    csslint: {
      options: {
        csslintrc: '_assets/less/.csslintrc'
      },
      src: '_assets/css/<%= pkg.name %>.css'
    },
    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*'
      },
      core: {
        src: '_assets/css/<%= pkg.name %>.css',
        dest: 'assets/css/<%= pkg.name %>.min.css'
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
        dest: 'assets/css/'
      }
    },
    sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    }
  });
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);
  grunt.registerTask('less-compile', ['less:core']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer', 'usebanner', 'csscomb', 'cssmin']);
  grunt.registerTask('default', ['dist-css']);
  grunt.registerTask('change-version-number', 'sed');
};
