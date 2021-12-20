//Add title, description, table of contents, installation, usage information, license, contributing, tests, and questions
//
// TODO: Include packages needed for this application
const Inquirer = require('inquirer');

const FS = require('fs');

const path = './README.md';

const licenses = 
{
MIT:{img:'(https://img.shields.io/badge/License-MIT-yellow.svg)', link:'https://opensource.org/licenses/MIT'},
GPLv3:{img:'(https://img.shields.io/badge/License-GPLv3-blue.svg)', link:'(https://www.gnu.org/licenses/gpl-3.0)'},
ISC:{img:'(https://img.shields.io/badge/License-ISC-blue.svg)', link:'(https://opensource.org/licenses/ISC)'},
ApacheLicense:{img:'(https://img.shields.io/badge/License-Apache_2.0-blue.svg)', link:'(https://opensource.org/licenses/Apache-2.0)'}
};

// TODO: Create an array of questions for user input
const questions = 
[
{name:'Title', message:'What is the title?'},
{name:'Description', message:'What is your project description?'},
// {type:'List', name:'TableofContents', message:'What are your table of contents?'},
{name:'Installation', message:'How to install the project:'},
{type:'checkbox', name:'License', message:'What is the license for the project?', choices:['GNU GPLv3', 'MIT', 'ISC', 'Apache License 2.0']},{name:'Contributing', message:'Insert contributers, seperate with commas:'},
{name:'GitHub', message:'What is your github username?'},
{name:'Email', message:'What is your email for questions?'}
];

Inquirer.prompt(questions).then((answers)=>
{
  let content = [];
  let license = answers.License[0];
  content.push(answers.Title, answers.Description, 'badges', 'Table of Contents', answers.Installation, license,
    answers.Contributing, {questions: {GitHub: answers.GitHub, Email: answers.Email}});
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
      // 'MIT', 'GPLv3', 'ISC', 'Apache License 2.0'
      if(element = 'MIT')
      {
        return `## Badge \n ![License]${licenses.MIT.img}` 
      }
      if(element = 'GPLv3')
      {
        return `## Badge \n ![License]${licenses.GPLv3.img}` 
      }
      if(element = 'ISC')
      {
        return `## Badge \n ![License]${licenses.ISC.img}` 
      }
      if(element = 'Apache License 2.0')
      {
        return `## Badge \n ![License]${licenses.ApacheLicense.img}`
      }
      break;

    case 3:
      return `## Table of Contents \n - [Installation](#installation)\n - [License](#license)\n - [Contributing](#contributing)\n - [Questions](#questions)`
      break;

    case 4:
      return `## Installation \n${element}`
      break;

    case 5:
      if(element = 'MIT')
      {
        return `## License \n ${licenses.MIT.link}` 
      }
      if(element = 'GPLv3')
      {
        return `## License \n ${licenses.GPLv3.link}` 
      }
      if(element = 'ISC')
      {
        return `## License \n ${licenses.ISC.link}` 
      }
      if(element = 'Apache License 2.0')
      {
        return `## License \n ${licenses.ApacheLicense.link}`
      }
      break;

    case 6:
      return `## Contributing \n${element}`
      break;

    case 7:
      return `## Questions \n - ${element.questions.GitHub} \n - ${element.questions.Email}`
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
