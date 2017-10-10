#!/usr/bin/env node
'use strict';

var meow = require('meow');
var hyperColour = require('./')();

const getField = (input, field) => input.map(o => o[field]);

var cli = meow([
	'Usage',
	'  $ hyper-colour',
	'',
	'Options',
	'  -p [number], palette [number] --- Switch palette by id from Colour Lovers',
	'  -u [url], url [url] --- Switch palette by url from Colour Lovers',
	'',
	'Examples',
	'$ hyper-colour palette 4531643',
	'$ hyper-colour url http://www.colourlovers.com/palette/4531643/Just_Another_Sunset',
	''
]);

if (!(Object.keys(cli.flags).length) && cli.input.length <= 1) { 
	cli.showHelp();
	process.exit(1);
} 

if (cli.input.length === 2) {
  hyperColour.set(cli.input[0], cli.input[1]);
}
