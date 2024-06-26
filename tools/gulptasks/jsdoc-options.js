/*
 * Copyright (C) Highsoft AS
 */

const gulp = require('gulp');
const path = require('node:path');

/* *
 *
 *  Constants
 *
 * */

const SOURCE_DIRECTORY = 'code/es-modules/';

const SOURCE_GLOBS = [
    'Accessibility',
    'Core',
    'Data',
    'Extensions',
    'Gantt',
    'Maps',
    'Series',
    'Shared',
    'Stock'
].map(
    glob => SOURCE_DIRECTORY + '/' + glob + '/**/*'
);

const TARGET_DIRECTORY = path.join('build', 'api');

const TREE_FILE = 'tree.json';

/* *
 *
 *  Functions
 *
 * */

/**
 * Creates the Highcharts API
 *
 * @return {Promise<void>}
 *         Promise to keep
 */
function createApiDocumentation() {

    const apidocs = require(
            '@highcharts/highcharts-documentation-generators'
        ).ApiDocs,
        argv = require('yargs').argv,
        fs = require('fs'),
        log = require('../libs/log');

    return new Promise((resolve, reject) => {

        log.message('Generating', TARGET_DIRECTORY + '...');

        const sourceJSON = JSON.parse(fs.readFileSync(TREE_FILE)),
            products = argv.products && argv.products.split(',');

        apidocs(sourceJSON, TARGET_DIRECTORY, products, error => {

            if (error) {
                log.failure(error);
                reject(error);
            } else {
                log.success('Created', TARGET_DIRECTORY);
                resolve();
            }
        });
    });
}

/**
 * Creates the `tree.json` file
 *
 * @return {Promise<void>}
 *         Promise to keep
 */
function createTreeJson(
    globs = SOURCE_GLOBS
) {
    const jsdoc = require('gulp-jsdoc3');
    const log = require('../libs/log');

    return new Promise((resolve, reject) => {

        const jsDocConfig = {
            plugins: [
                path.join(
                    'node_modules', '@highcharts',
                    'highcharts-documentation-generators', 'jsdoc', 'plugins',
                    'highcharts.jsdoc'
                )
            ]
        };

        log.success('Generating', TREE_FILE + '...');

        gulp
            .src(globs, { read: false })
            .pipe(jsdoc(
                jsDocConfig,
                error => {
                    if (error) {
                        log.failure(error);
                        reject(error);
                    } else {
                        log.success('Created', TREE_FILE);
                        resolve();
                    }
                }
            ));
    });
}

/**
 * Some tests for consistency of the `tree.json`.
 *
 * @return {Promise<void>}
 *         Promise to keep
 */
function testTreeJson() {

    const fs = require('node:fs');

    return new Promise(resolve => {

        if (!fs.existsSync(TREE_FILE)) {
            throw new Error(TREE_FILE + ' file not found.');
        }

        const treeJson = JSON.parse(fs.readFileSync(TREE_FILE, 'utf8'));

        if (Object.keys(treeJson.plotOptions.children).length < 66) {
            throw new Error(
                TREE_FILE + ' file must contain at least 66 series types'
            );
        } else {
            resolve();
        }
    });
}

/* *
 *
 *  Tasks
 *
 * */

/**
 * Creates JSON-based option references from JSDoc.
 *
 * @return {Promise<void>}
 *         Promise to keep
 */
async function jsDocOptions() {

    const argv = require('yargs').argv;

    if (argv.custom) {
        await createTreeJson([
            SOURCE_DIRECTORY + '/Core/**/*',
            SOURCE_DIRECTORY + '/Stock/Scrollbar/*',
            SOURCE_DIRECTORY + '../custom.src.js'
        ]);
    } else {
        await createTreeJson();
        await testTreeJson();
        await createApiDocumentation();
    }

}

gulp.task('jsdoc-options', jsDocOptions);
