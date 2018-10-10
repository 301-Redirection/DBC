// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const karmaJasmine = require('karma-jasmine');
const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaJasmineHTMLReporter = require('karma-jasmine-html-reporter');
const karmaCoverageIstanbul = require('karma-coverage-istanbul-reporter');
const karma = require('@angular/cli/plugins/karma');
const karmaCoverage = require('karma-coverage');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            karmaJasmine,
            karmaChromeLauncher,
            karmaJasmineHTMLReporter,
            karmaCoverageIstanbul,
            karmaCoverage,
            karma,
        ],
        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true,
        },
        angularCli: {
            environment: 'dev',
        },
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src.js': ['coverage'],
        },

        coverageReporter: {
            reporters: [{ type: 'lcov' }],
        },
        remapIstanbulReporter: {
            reports: {
                html: 'coverage',
                lcovonly: './coverage/coverage.lcov',
            },
        },
        reporters: config.angularCli && config.angularCli.codeCoverage
            ? ['progress', 'karma-remap-istanbul']
            : ['progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        webpack: {
            node: {
                fs: 'empty',
            },
        },
    });
};
