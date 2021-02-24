const inquirer = require('inquirer');
const { requiredText } = require('../utils/validations')

async function readMasterPassword() {
  const { password } = await inquirer.prompt([
    {
      type: 'password',
      name: 'password',
      message: 'Enter master password:',
      mask: '*',
      validate: requiredText,
    }
  ])
  return password
}

module.exports = {
  readMasterPassword
}