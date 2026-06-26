import adaptaterStatic from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adaptaterStatic({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		files: {
			assets: 'static'
		},
		alias: {
			$types: 'src/types'
		}
	}
};

export default config;
