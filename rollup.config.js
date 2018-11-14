import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';
import istanbul from 'rollup-plugin-istanbul';
import json from 'rollup-plugin-json';

export default {
    input: 'src/guppy.js',
    output: {name:'Guppy',
	     file:process.env.NODE_ENV === 'production' ? 'build/guppy.min.js' :( process.env.NODE_ENV === 'test' ? 'build/guppy-test.js' : 'build/guppy.js'),
	     format: 'iife'},
    plugins: [
	commonjs({
            include: [
                'lib/mousetrap/**',
                'lib/katex/**'
            ],
	    namedExports: { 'mousetrap': ['Mousetrap'] }
	}),
	json({
            include: ['sym/**']
	}),
	babel({
            exclude: 'node_modules/**',
            presets: [['es2015', { "modules": false }]]
	}),
	(process.env.NODE_ENV === 'test' && istanbul({
	    include: ['src/**']
	})),
	eslint,
	(process.env.NODE_ENV === 'production' && uglify),
    ],
};
