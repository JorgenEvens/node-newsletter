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
					watch: ['src'],
					callback: function(nodemon) {
						var fs = require('fs');

						function refresh() {
							fs.writeFileSync('.rebooted', 'rebooted');
						};
						
						nodemon.on('restart', function() {
							setTimeout(refresh, 1000);
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
					compress: true,
					lineos: true,
					use: ['nib']
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
			app: {
				files: ['.rebooted'],
				options: {
					livereload: true
				}
			}
		}

	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	// Default task(s).
	grunt.registerTask('default', [ 'concurrent' ]);

};