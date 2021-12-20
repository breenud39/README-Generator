//Add title, description, table of contents, installation, usage information, license, contributing, tests, and questions
//
// TODO: Include packages needed for this application
const Inquirer = require('inquirer');

const FS = require('fs');

const path = './README.md';

// TODO: Create an array of questions for user input
const questions = 
[
{name:'Title', message:'What is the title?'},
{name:'Description', message:'What is your project description?'},
{type:'List', name:'TableofContents', message:'What are your table of contents?'},
{name:'Installation', message:'How to install the project'},
{type:'checkbox', name:'License', message:'What is the license for the project?', choices:['GNU', 'MIT', 'GPLv3', 'ISC', 'Apache License 2.0']},{name:'Contributing', message:'Insert contributers, seperate with commas'},
{name:'Tests', message:'What are your tests? Seperate with commas.'}
];

Inquirer.prompt(questions).then((answers)=>
{
  let content = [];
  content.push(answers.Title, answers.Description, answers.TableofContents, answers.Installation, JSON.stringify(answers.License),
    answers.Contributing, answers.Tests)
    console.log(JSON.stringify(answers.License))
  writeToFile(path, content);
});

// Make each content line on a new line, and declare the template title
function format(i, element)
{
  switch(i)
  {
    case 0:
      return `# ${element}`;
      break;

    case 1:
      return `## Description \n${element}`
      break;

    case 2:
      return `## Table of Contents \n - [Installation](#installation)\n - [License](#license)\n - [Contributing](#contributing)\n - [Tests](#tests)`
      break;

    case 3:
      return `## Installation \n${element}`
      break;

    case 4:
      return `## License \n${element}`
      break;

    case 5:
      return `## Contributing \n${element}`
      break;

    case 6:
      return `## Tests \n${element}`
      break;
  }
}

function tableOfContents(string)
{
  //x,y,z
  let result
  for(i = 0; i < string.length; i++)
  {
    string[i] != ','?result+=string[i]: result+=`\n - `;
  }
  return result;
}

// TODO: Create a function to write README file
function writeToFile(fileName, array)
{
  let string
  const createStream = FS.createWriteStream(fileName, {flags: 'a'});
  for(let i = 0; i < array.length; i++)
  {
    createStream.write(format(i, array[i]) + '\r\n')
  }
}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
