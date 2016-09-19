/**
 * Starts the test runner which in turn loads test frameworks,
 * assertion libraries and then executes tests.
 *
 * Example Usage:
 * gulp test
 * gulp test --watch
 */

import gulp from 'gulp';
import {argv as args} from 'yargs';
import globalSettings from '../../config';
import testSuiteWrapper from './testSuite';

gulp.task('test', (done) => {
    var karmaSettings = {
        configFile: globalSettings.taskConfiguration.test.configPath
    };

    if (args.watch) {
        karmaSettings.autoWatch = true;
        karmaSettings.singleRun = false;
    }

    testSuiteWrapper.runTests(karmaSettings, done);
});
