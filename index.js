// External packages
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const path = require("path");
const glob = require("glob");

// Internal modules
const api = require("./utils/api.js");
const generateMarkdown = require("./generateMarkdown.js");

// Inquirer prompts for userResponses
const questions = [
  {
    type: "input",
    message: "Please enter your GitHub Username? (Without the @)",
    name: "username",
    validate: (answer) => {
      if (answer.length < 1) {
        return console.log("A valid GitHub username is required.");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "Please enter your Email Address",
    name: "email",
    default: "example@example.com",
    validate: (answer) => {
      const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (validEmail.test(answer)) {
        return true;
      } else {
        return console.log("Please enter a valid email address.");
      }
    },
  },
  {
    type: "input",
    message: "Please enter a title for the project?",
    name: "title",
    validate: (answer) => {
      if (answer.length < 1) {
        return console.log("Please enter a valid project title");
      }
      return true;
    },
  },
  {
    type: "input",
    message: "Please enter a description of the project",
    name: "description",
    validate: (answer) => {
      if (answer.length < 1) {
        return console.log("Please enter a valid project description");
      }
      return true;
    },
  },
  {
    type: "input",
    message:
      "If required, please describe the steps required to install this project.",
    name: "installation",
  },
  {
    type: "input",
    message:
      "If required, please provide instructions and examples for use",
    name: "usage",
  },
  {
    type: "list",
    name: "screenshot",
    message:
      "Choose an image or video file from the list below: (only valid files in assets/images folder will be shown)",
    choices: () => {
      const files = glob.sync(
        "assets/images/*.{png,jpg,jpeg,gif,mp4,webm,ogg,mov}"
      );
      return files.map((file) => path.relative(process.cwd(), file));
    },
  },
  {
    type: "input",
    message: "If required, please provide tests for the application",
    name: "tests",
  },
  {
    type: "input",
    message:
      "If required, list any resources or third-party assets that require attribution. To add a link to the resource, please use the following format: [Title](URL)",
    name: "credits",
  },
  {
    type: "list",
    message: "PLease choose a license for your project.",
    choices: [
      "GNU AGPLv3",
      "GNU GPLv3",
      "GNU LGPLv3",
      "Mozilla Public License 2.0",
      "Apache License 2.0",
      "MIT License",
      "Boost Software License 1.0",
      "The Unlicense",
    ],
    name: "license",
  },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log("Your README.md file has been generated successfully.");
  });
}

const writeFileAsync = util.promisify(writeToFile);

// Main function
async function init() {
  try {
    // Prompt Inquirer questions
    const userResponses = await inquirer.prompt(questions);
    console.log("Your responses: ", userResponses);
    console.log("Thank you for your responses! We are fetching your GitHub data...");

    // Call GitHub api for user info
    const userInfo = await api.getUser(userResponses);
    console.log("GitHub user info: ", userInfo);

    // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
    console.log("Generating your README...");
    const markdown = generateMarkdown(userResponses, userInfo);
    console.log(markdown);

    // Write markdown to file
    await writeFileAsync("GeneratedREADME.md", markdown);
  } catch (error) {
    console.log(error);
  }
}

init();
