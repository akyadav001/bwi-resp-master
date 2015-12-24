'use strict';

var config = module.exports = {
	port: 8080,
	source: {
		root: 'src',
		get assets() { return config.source.root + '/assets' },
		get images() { return config.source.root + '/images' },
		get scripts() { return config.source.root + '/scripts' },
		get styles() { return config.source.root   +  '/styles' },
    get icons() { return config.source.root + '/assets/icons/svg'}
	},
	destination: {
		root: 'dist',
		get assets() {return config.destination.root  + '/assets'},
		get scripts() {return config.destination.root + '/scripts' },
		get styles() { return config.destination.root + '/styles' },
		get images() { return config.destination.root  },
    get icons() { return config.destination.root}
	},
	globs: {
		get assets() {
			var globs = [config.source.assets + '/**/**'];
			return globs;
		},
		get images() {
			var globs = [config.source.images + '**/**'];
			return globs;
		},
		get scripts() {
			var globs = [config.source.scripts + '/*.js'];
			return globs;
		},
      get icons() {
         var globs = [config.source.icons + '/*.svg'];
         return globs;
      },
		styles: {
			get build() {
				var globs = [config.source.styles + '/*.less'];
				return globs;
			},
			get watch() {
				var globs = config.globs.styles.build;
				globs[0] = config.source.styles + '/**/*.less';
				return globs;
			}
		}
	},
	browserList:
		['Firefox >= 23', 'Safari >= 7','Chrome >= 31', 'Explorer >= 10', 'Android 4.1']
}
