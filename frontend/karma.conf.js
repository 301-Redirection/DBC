// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const karmaJasmine = require('karma-jasmine');
const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaJasmineHTMLReporter = require('karma-jasmine-html-reporter');
const karmaCoverageIstanbul = require('karma-coverage-istanbul-reporter');
const karmaCoverage = require('karma-coverage');
const karma = require('@angular/cli/plugins/karma');

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
        preprocessors: { '**/app/**/!(*spec).js': ['coverage'] },
        coverageReporter: {
            dir: '../coverage/',
            reporters: [
                { type: 'html' },
                { type: 'lcov' },
            ],
        },
        angularCli: {
            environment: 'dev',
        },
        reporters: ['progress', 'kjhtml', 'coverage'],
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
