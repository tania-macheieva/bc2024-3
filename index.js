let fs = require('node:fs');
const { Command } = require('commander');

const program = new Command();

program
    .option('-i, --input - (обовʼязковий параметр) шлях до файлу, який даємо для читання (json з даними серверу Національного банку України)')
    .option('-o, --output - (не обовʼязковий параметр) шлях до файлу, у якому записуємо результат')
    .option('-d, --display - (не обовʼязковий параметр) якщо задано цей параметр, то результат має бути виведено у консоль')
    .parse(process.argv);

const options = program.opts();


//Check if input file exists
if(!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

//Read data from input file
const data = fs.readFileSync(options.input, 'utf-8');
const jsonData = JSON.parse(data);

// Check if input file exists
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
  }  

// Display data in console if -d is specified
if (options.display) {
    console.log(jsonData);
}

// Write data to output file if -o is specified
if (options.output) {
    fs.writeFileSync(options.output, JSON.stringify(jsonData, null, 2));
    
    // Display data in console again if -d is specified
    if (options.display) {
      console.log(jsonData);
    }
}
  