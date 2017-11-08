#!/usr/bin/env node
'use strict';

var meow = require('meow');
const camelCase = require('camelcase');
const R = require('ramda');
const DOMParser = require('dom-parser');
const http = require('http');
const fs = require('fs');

const getField = (input, field) => input.map(o => o[field]);

var callback = function(response) {
  var str = '';

  response.on('data', function (chunk) {
    str += chunk;
  });


  response.on('end', function () {

    var colors = [];
    var parser = new DOMParser();
    var res = parser.parseFromString(str, 'text/xml');
    var color_list = res.getElementsByTagName("hex");

    for (var i=0; i<color_list.length; i++){
      colors[i] = "#" + color_list[i%color_list.length].innerHTML;
    }

    for (var i=0; i<colors.length; i++){
      console.log(colors[i]);
    }

    var stream = fs.createWriteStream(require('os').homedir() + '/.hyper_plugins/local/hyper-colour/colors');
    stream.once('open', function(fd) {
      for (var i=0; i<color_list.length; i++){
        stream.write("#" + color_list[i%color_list.length].innerHTML + "\n");
      }
      stream.end();
    });
  });
}

const setConfigAttr = (param,val) => {
  if (param == 'palette' || param== 'p'){
    try {
      http.request('http://www.colourlovers.com/api/palette/' + val, callback).end();
    } catch (err){
      console.log(err);
    }
  }
}

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
  setConfigAttr(cli.input[0], cli.input[1]);
}
