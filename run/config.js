/**
 * Configuration object for all tasks.
 *
 * @type {Object}
 */
const config = {};

/**
 * Where built output (CSS, JS, HTML, fonts, images) should be stored on the
 * filesystem. Can either be an absolute path or relative path to the location
 * of the gulpfile.
 *
 * @type {String}
 */
config.destPath = './dist/';

/**
 * A re-used path specifying where the test suite should save results.
 *
 * @type {String}
 */
config.testResultsPath = './test-results/';

/**
 * Configuration settings for any task which needs them. Keys should match the
 * task name for consistency and easier maintenance.
 *
 * @type {Object}
 */
config.taskConfiguration = {
    build: {},
    copy: {
        sourcePaths: ['./fonts/**/!(dir.txt)', './web-manifest.json']
    },
    clean: {
        targetPaths: [config.destPath, config.testResultsPath],
        delOptions: {
        }
    },
    html: {
        sourcePaths: ['./html/**/*.html']
    },
    lint: {
        sourcePaths: ['./apps/**/*.js', './3rdparty/js/**/*.js', './run/**/*.js']
    },
    images: {
        sourcePaths: ['./img/**/!(dir.txt)'],
        imageminPlugins: {
            gifsicle: {},
            jpegtran: {},
            optipng: {},
            svgo: {
                plugins: [
                    {removeViewBox: false},
                    {removeUselessStrokeAndFill: false},
                    {convertPathData: {straightCurves: false}},
                    {cleanupIDs: false}
                ]
            }
        }
    },
    styles: {
        /**
         * A folder path that is prefixed with the global `destPath` to give a
         * standard destination for CSS bundles. This can be overridden per
         * bundle if for example some bundles need to go somewhere else.
         *
         * @type {String}
         */
        genericOutputFolder: 'css/',

        /**
         * A manifest of CSS bundles needing to be created and output
         *
         * Bundle Object Keys:
         * `sourceFilePath` - The path to the SCSS entry file (relative to `gulpfile.js`).
         * `outputFileName` - The extensionless name of the output file.
         * `outputFolder` (Optional) - Overrides `genericOutputFolder`. Is relative to `gulpfile.js`.
         *
         * Example Bundles:
         * {sourceFilePath: './css/src/homepage.scss', outputFileName: 'homepage'},
         * {sourceFilePath: './css/src/about.scss', outputFileName: 'main', outputFolder: './modules/about-page/css/'}
         *
         * @type {Array}
         */
        bundles: [
            {
                sourceFilePath: './apps/quickstart/styles/index.scss',
                outputFileName: 'quickstart'
            }
        ],

        /**
         * Settings to be passed through to `gulp-sass` and `node-sass`.
         * NOTE: `compact` used instead of `compressed` to due sourcemap bug.
         *
         * @type {Object}
         */
        sassSettings: {
            outputStyle: 'compact'
        },

        /**
         * Settings to be passed through to `gulp-autoprefixer`.
         *
         * @type {Object}
         */
        autoPrefixSettings: {
            browsers: ['last 2 versions', 'iOS >= 7.1', 'Android >= 4'],
            cascade: false
        },

        /**
         * Settings for how sourcemaps should be output for bundles.
         *
         * @type {Object}
         */
        sourcemapOptions: {
            /**
             * Sourcemaps are built externally but there is two choices.
             *
             * Source files can be embedded inside the map itself, or,
             * the source files can be referenced by the map and loaded
             * whenever you try to click line numbers in your dev tools.
             *
             * If your source files are not being served via a web server
             * or they aren't publicly accessible then stick to using
             * `External_EmbeddedFiles`.
             *
             * Potential Values:
             * 'External_EmbeddedFiles'
             * 'External_ReferencedFiles'
             *
             * @type {String}
             */
            type: 'External_EmbeddedFiles',

            /**
             * Sets the root path of where source files are hosted. This
             * path is relative to the source map. If you have sources in
             * different subpaths, an absolute path (from the domain root)
             * pointing to the source file root is recommended.
             *
             * NOTE: Only needs to be set for 'External_ReferencedFiles'.
             *
             * @type {String}
             */
            sourceRoot: '/'
        }
    },
    scripts: {
        /**
         * A folder path that is prefixed with the global `destPath` to give a
         * standard destination for JS bundles.
         *
         * @type {String}
         */
        genericOutputFolder: './js/',

        /**
         * Settings for webpacks uglify plugin.
         *
         * @type {Object}
         */
        uglifySettings: {
            compress: {
                'drop_console': false,
                'drop_debugger': false,
                'warnings': false
            }
        },

        /**
         * Settings for the Browser-sync plugin.
         *
         * @type {Object}
         */
        browserSyncSettings: {
            files: [
                'dist/**/*.html',
                'dist/css/**/*.css',
                'dist/js/**/*.js',
                'dist/img/**/*.*'
            ],
            logConnections: true,
            open: false,
            port: process.env.PORT || 4321,
            server: './dist/'
        },

        /**
         * Base settings for webpack.
         *
         * NOTE: For a full list of options, please visit:
         * https://webpack.github.io/docs/configuration.html
         *
         * @type {Object}
         */
        webpackSettings: {
            watch: false,
            entry: {
                'polyfills': './3rdparty/js/polyfills.js',
                'vendor': './3rdparty/js/vendor.js',
                'quickstart': './apps/quickstart/js/index.js'
            },
            output: {
                filename: '[name].js'
            },
            module: {
                noParse: /node_modules\/rxjs\/bundles\/Rx.js/,
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components|run\/tasks\/test\/wrapper\.js)/,
                        loader: ['babel'],
                        query: {
                            presets: ['es2015', 'angular2']
                        }
                    }
                ]
            },
            plugins: [
            ]
        }
    },
    test: {
        configPath: `${__dirname} + /../karma.conf.js`
    },
    watch: {
        sourcePaths: {
            html: ['./html/**/*.html'],
            styles: ['./apps/**/styles/*.scss']
        }
    }
};

export default config;
