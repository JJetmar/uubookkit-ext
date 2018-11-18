import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { eslint }from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import config from "./package.json";
import { externalRequirements, externalCssResources } from "./src/uubookkit-ext/modules/modules-loader";
import json from "rollup-plugin-json";
console.log(externalCssResources);
const METADATA = `// ==UserScript==
// @name         ${config.name}
// @namespace    ${config.homepage}
// @version      ${config.version}
// @description  ${config.description}
// @author       ${config.author}
// @match        https://uuos9.plus4u.net/uu-dockitg01-main/*
// @match        https://uuos9.plus4u.net/uu-bookkitg01-main/*
// @match        https://docs.plus4u.net/book*\n` +
externalRequirements.map(dependency => `// @require      ${dependency}`).join("\n") + "\n" +
Object.keys(externalCssResources).map(cssResourceName =>
    `// @resource     ${cssResourceName} ${externalCssResources[cssResourceName]}\n`
).join("\n") +
`// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==\n` +
Object.keys(externalCssResources).map(cssResourceName =>
`GM_addStyle(GM_getResourceText("${cssResourceName}"));\n`
).join("\n");

export default {
    input: './src/uubookkit-ext/index.js',
    external: ['jquery', "document"],
    output: {
        file: './dist/uubookkit-ext.user.js',
        format: 'iife',
        globals: {
            $: 'jquery'
        }
    },
    plugins: [
        resolve(),
        json({
            exclude: [ 'node_modules/**'],
            namedExports: true

        }),
        // eslint({
        //     exclude: [
        //         'src/**/*.sass',
        //     ]
        // }),
        babel({
            exclude: 'node_modules/**'
        }),
        /*
        uglify({
            output: {
                preamble: METADATA
            }
        })*/
    ]
};