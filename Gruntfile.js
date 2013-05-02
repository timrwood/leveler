'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		compass: {
			dev: {
				options: {
					sassDir: 'scss',
					cssDir: 'css'
				}
			}
		},
		watch: {
			compass: {
				files: ['scss/*.scss', 'scss/**/*.scss'],
				tasks: ['compass']
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');

	// Default task.
	grunt.registerTask('default', ['compass']);
};
