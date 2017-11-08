fs = require('fs');

const file_path = require('os').homedir() + '/.hyper_plugins/local/hyper-colour/colors';
const input = fs.existsSync(file_path) ? fs.readFileSync(file_path) : null;

function setColors(input, config){

  var lines = input.toString().split('\n');

  return Object.assign({}, config, {
    borderColor: '#292957',
    cursorColor: '#f3c947',
    foregroundColor: lines[lines.length-1],
    backgroundColor: lines[0],
    colors: lines
  });
}

exports.decorateConfig = (config) => {

  if (input) {

      return setColors(input, config);

    } else {

      console.log('Please run hyper-colour first!');
      return Object.assign({}, config, {});
  }

  
}