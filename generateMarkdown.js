const path = require("path");

function generateMarkdown(userResponses, userInfo) {
  const filePath = path.join(__dirname);
  // splice to include only the final directory
  const dir = filePath.split("/").splice(-1);
  console.log(dir);

  // Generate Table of Contents conditionally based on userResponses
  let draftToC = `## Table of Contents`;

  if (userResponses.installation !== "") {
    draftToC += `
  * [Installation](#installation)`;
  }

  if (userResponses.usage !== "") {
    draftToC += `
  * [Usage](#usage)`;
  }

  if (userResponses.contributing !== "") {
    draftToC += `
  * [Contributing](#contributing)`;
  }

  if (userResponses.tests !== "") {
    draftToC += `
  * [Tests](#tests)`;
  }

  if (userResponses.screenshot !== "") {
    draftToC += `
  * [Application Preview](#preview)`;
  }


  // Generate markdown for the top required portions of the README
  let draftMarkdown = `# ${userResponses.title}

  ![Badge for GitHub repo total languages](https://img.shields.io/github/languages/count/${userResponses.username}/${dir}?style=for-the-badge&logo=appveyor) ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${userResponses.username}/${dir}?style=for-the-badge&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${userResponses.username}/${dir}?style=for-the-badge&logo=appveyor)
  
  Badges provided by [shields.io](https://shields.io/).
  
  
  ## Description 
  
  *Application Description:* 
  
  ${userResponses.description}

  `;

  // Add Table of Contents to markdown
  draftMarkdown += draftToC;

  // Add License section since License is required to Table of Contents
  draftMarkdown += `
  * [License](#license)`;

  // Add License section since License is required to Table of Contents
  draftMarkdown += `
  * [Questions & Contact](#questions)`;


  // Optional Installation section
  if (userResponses.installation !== "") {
    draftMarkdown += `
  
  ## Installation
  
  *Steps required to install project and how to get the development environment running:*
  
  ${userResponses.installation}`;
  }

  // Optional Usage section
  if (userResponses.usage !== "") {
    draftMarkdown += `
  
  ## Usage 
  
  *Instructions and examples for use:*
  
  ${userResponses.usage}`;
  }

  // Optional Contributing section
  if (userResponses.contributing !== "") {
    draftMarkdown += `
  
  ## Contributing
  
  *If you would like to contribute it, you can follow these guidelines for how to do so.*
  
  ${userResponses.contributing}`;
  }

  // Optional Tests section
  if (userResponses.tests !== "") {
    draftMarkdown += `
  
  ## Tests

  *Tests for application and how to run them:*
  
  ${userResponses.tests}`;
  }

  // Optional Screenshot section
  if (userResponses.screenshot !== "") {
    draftMarkdown += `
    
  ## Preview

  *Screenshots or videos of the application in use:*
    
     
  ![Screenshot deployed application](${userResponses.screenshot})`;
  }

  // License section is required
  draftMarkdown += `

  
  ## License
  
  ${userResponses.license}
  `;

  // Questions / About Developer section
  let draftDev = `
  ---
  
  ## Questions?

  <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="50%" />
  
  For any questions, please contact me with the information below:
 
  Email: ${userResponses.email}
  `;

  // Add developer section to markdown
  draftMarkdown += draftDev;

  // Return markdown
  return draftMarkdown;
}

module.exports = generateMarkdown;
