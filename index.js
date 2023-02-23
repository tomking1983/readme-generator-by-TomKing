// External packages
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const path = require('path');

// const filePath = path.join(__dirname);
// // splice to include only the final directory
// const dir = filePath.split('/').splice(-1);
// console.log(dir);

// Internal modules
const api = require('./utils/api.js');
const generateMarkdown = require('./generateMarkdown.js');

// Inquirer prompts for userResponses
const questions = [
    {
        type: 'input',
        message: "Please enter your GitHub Username? (Without the @)",
        name: 'username',
        default: 'tomking1983',
        validate:  answer => {
            if (answer.length < 1) {
                return console.log("A valid GitHub username is required.");
            }
            return true;
        }
    },

    {
        type: 'input',
        message: "Please enter your Email Address",
        name: 'email',
        default: 'tomking151183@gmail.com',
        validate: answer => {
            const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (validEmail.test(answer)) {
                return true;
            } else {
                return console.log("Please enter a valid email address.");
            }
        }
    },

    // {
    //     type: 'input',
    //     message: "Please enter the repo name as per GitHub",
    //     name: 'repo',
    //     default: 'Repo Name',
    //     validate: answer => {
    //         if (answer.length < 1) {
    //             return console.log("Please enter a valid repo name");
    //         }
    //         return true;
    //     }
    // },
    
    {
        type: 'input',
        message: "Please enter a title for the project?",
        name: 'title',
        default: 'Project Title',
        validate: answer => {
            if (answer.length < 1) {
                return console.log("Please enter a valid project title");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Please enter a description of the project",
        name: 'description',
        default: 'Project Description',
        validate: answer => {
            if (answer.length < 1) {
                return console.log("Please enter a valid project description");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "Please enter the path to the project's image",
        name: 'screenshot',
        default: '',
        validate: answer => {
            if (answer.length < 1) {
                return console.log("Please enter a valid path to the project's image");
            }
            return true;
        }
    },
    {
        type: 'input',
        message: "If required, please describe the steps required to install this project.",
        name: 'installation'
    },
    {
        type: 'input',
        message: "Please provide instructions and examples of your project in use for the Usage section.",
        name: 'usage'
    },
    {
        type: 'input',
        message: "If required, please provide guidelines on how developers can contribute to your project.",
        name: 'contributing'
    },
    {
        type: 'input',
        message: "If required, please provide any tests written for your application and provide examples on how to run them.",
        name: 'tests'
    },
    {
        type: 'list',
        message: "PLease choose a license for your project.",
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        name: 'license'
    }

];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Your README.md file has been generated successfully.")
    });
}

const writeFileAsync = util.promisify(writeToFile);


// Main function
async function init() {
    try {

        // Prompt Inquirer questions
        const userResponses = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
        console.log("Thank you for your responses! Fetching your GitHub data...");
    
        // Call GitHub api for user info
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
        console.log("Generating your README...")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        // Write markdown to file
        await writeFileAsync('ExampleREADME.md', markdown);

    } catch (error) {
        console.log(error);
    }
};

init();
