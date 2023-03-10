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

  if (userResponses.credits !== "") {
    draftToC += `
  * [Credits](#credits)`;
  }

  if (userResponses.usage !== "") {
    draftToC += `
  * [Usage](#usage)`;
  }

  if (userResponses.screenshot !== "") {
    draftToC += `
  * [Application Preview](#preview)`;
  }

  if (userResponses.tests !== "") {
    draftToC += `
  * [Tests](#tests)`;
  }

  // Generate markdown for the top required portions of the README
  let draftMarkdown = `# ${userResponses.title}

  ![Badge for GitHub repo total languages](https://img.shields.io/github/license/${userResponses.username}/${dir}?style=for-the-badge) ![Badge for GitHub repo total languages](https://img.shields.io/github/languages/count/${userResponses.username}/${dir}?style=for-the-badge&logo=appveyor) ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/${userResponses.username}/${dir}?style=for-the-badge&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/${userResponses.username}/${dir}?style=for-the-badge&logo=appveyor)
  
  ## Description 
  
  *Application Description:* 
  
  ${userResponses.description}

  `;

  // Add Table of Contents to markdown
  draftMarkdown += draftToC;

  // Add License section to Table of Contents
  draftMarkdown += `
  * [License](#license)`;

  // Add Contributors section to Table of Contents
  draftMarkdown += `
  * [Contributors](#contributors)`;

  // Add Questions section to Table of Contents
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

  *Examples for use:*
  
  ${userResponses.usage}`;
  }

  // Optional Credits section
  if (userResponses.credits !== "") {
    draftMarkdown += `
  
  ## Credits

  *Credits for any resources or third-party assets used:*
  
  ${userResponses.credits}`;
  }

  // Optional Screenshot section
  if (userResponses.screenshot !== "") {
    draftMarkdown += `
    
  ## Preview

  *Screenshots or videos of the application in use:*
    
     
  ![Screenshot deployed application](${userResponses.screenshot})`;
  }

  // Optional Test section
  if (userResponses.tests !== "") {
    draftMarkdown += `

## Tests

*Tests for application and how to run them:*

${userResponses.tests}`;
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
 
  Email: ${userResponses.email} <br />
  Git Hub Profile: [@${userResponses.username}](https://github.com/${userResponses.username})
  `;

  // Contributors section
  draftMarkdown += `
---
## Contributors

# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, caste, color, religion, or sexual
identity and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.

## Our Standards

Examples of behavior that contributes to a positive environment for our
community include:

* Demonstrating empathy and kindness toward other people
* Being respectful of differing opinions, viewpoints, and experiences
* Giving and gracefully accepting constructive feedback
* Accepting responsibility and apologizing to those affected by our mistakes,
  and learning from the experience
* Focusing on what is best not just for us as individuals, but for the overall
  community

Examples of unacceptable behavior include:

* The use of sexualized language or imagery, and sexual attention or advances of
  any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or email address,
  without their explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

## Enforcement Responsibilities

Community leaders are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate, threatening, offensive,
or harmful.

Community leaders have the right and responsibility to remove, edit, or reject
comments, commits, code, wiki edits, issues, and other contributions that are
not aligned to this Code of Conduct, and will communicate reasons for moderation
decisions when appropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.
Examples of representing our community include using an official e-mail address,
posting via an official social media account, or acting as an appointed
representative at an online or offline event.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at ${userResponses.email}.
All complaints will be reviewed and investigated promptly and fairly.

All community leaders are obligated to respect the privacy and security of the
reporter of any incident.

## Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining
the consequences for any action they deem in violation of this Code of Conduct:

### 1. Correction

**Community Impact**: Use of inappropriate language or other behavior deemed
unprofessional or unwelcome in the community.

**Consequence**: A private, written warning from community leaders, providing
clarity around the nature of the violation and an explanation of why the
behavior was inappropriate. A public apology may be requested.

### 2. Warning

**Community Impact**: A violation through a single incident or series of
actions.

**Consequence**: A warning with consequences for continued behavior. No
interaction with the people involved, including unsolicited interaction with
those enforcing the Code of Conduct, for a specified period of time. This
includes avoiding interactions in community spaces as well as external channels
like social media. Violating these terms may lead to a temporary or permanent
ban.

### 3. Temporary Ban

**Community Impact**: A serious violation of community standards, including
sustained inappropriate behavior.

**Consequence**: A temporary ban from any sort of interaction or public
communication with the community for a specified period of time. No public or
private interaction with the people involved, including unsolicited interaction
with those enforcing the Code of Conduct, is allowed during this period.
Violating these terms may lead to a permanent ban.

### 4. Permanent Ban

**Community Impact**: Demonstrating a pattern of violation of community
standards, including sustained inappropriate behavior, harassment of an
individual, or aggression toward or disparagement of classes of individuals.

**Consequence**: A permanent ban from any sort of public interaction within the
community.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.1, available at
[https://www.contributor-covenant.org/version/2/1/code_of_conduct.html][v2.1].

Community Impact Guidelines were inspired by
[Mozilla's code of conduct enforcement ladder][Mozilla CoC].

For answers to common questions about this code of conduct, see the FAQ at
[https://www.contributor-covenant.org/faq][FAQ]. Translations are available at
[https://www.contributor-covenant.org/translations][translations].

[homepage]: https://www.contributor-covenant.org
[v2.1]: https://www.contributor-covenant.org/version/2/1/code_of_conduct.html
[Mozilla CoC]: https://github.com/mozilla/diversity
[FAQ]: https://www.contributor-covenant.org/faq
[translations]: https://www.contributor-covenant.org/translations
`;

  // Add developer section to markdown
  draftMarkdown += draftDev;

  // Return markdown
  return draftMarkdown;
}

module.exports = generateMarkdown;
