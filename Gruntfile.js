module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		nodemon: {
			app: {
				script: 'src/index.js',
				options: {
					env: { PORT: 9090 },
					ext: 'js,jade',
					watch: ['!src/js','!src/public','src'],
					callback: function(nodemon) {
						var fs = require('fs');

						function refresh() {
							fs.writeFileSync('.rebooted', 'rebooted');
						};

						nodemon.on('restart', function() {
							setTimeout(refresh, 250);
						});
					}
				}
			}
		},

		stylus: {
			css: {
				files: {
					'src/public/css/main.min.css': 'src/css/main.styl'
				},
				options: {
					urlfunc: 'embed',
					compress: false,
					lineos: true,
					use: [
						require('fluidity')
					]
				}
			}
		},

		concurrent: {
			app: {
				tasks: [ 'nodemon:app', 'watch' ],
				options: {
	                logConcurrentOutput: true
	            }
			}
		},

		watch: {
			css: {
				files: ['src/css/**/*.styl'],
				tasks: ['stylus:css'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			js: {
				files: [
					'!src/js/**/*.min.js',
					'!src/js/**/*.debug.js',
					'src/js/**/*.js'
				],
				tasks: ['browserify:core'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			app: {
				files: ['.rebooted'],
				options: {
					livereload: true
				}
			}
		},

		browserify: {
			core: {
				files: {
					'src/public/js/core.debug.js': ['src/js/core.js']
				}
			}
		}

	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-browserify');

	// Default task(s).
	grunt.registerTask('default', [ 'concurrent' ]);

};