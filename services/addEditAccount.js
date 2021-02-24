const inquirer = require('inquirer');
const { readMasterPassword } = require('../helpers/inquirer');
const { requiredText } = require('../utils/validations')
const {
  getDecodedAccounts,
  getEncryptedString 
} = require('../helpers/crypto');
const {
  isMasterPasswordValid,
} = require('../helpers/password');

async function addEditAccount(storage) {
  const { user, password } = await inquirer.prompt([
    {
      type: 'input',
      name: 'user',
      message: 'Username or email:',
      validate: requiredText
    },
    {
      type: 'password',
      name: 'password',
      message: 'Password:',
      mask: '*',
      validate: requiredText,
    }
  ])
  const masterPassword = await readMasterPassword();
  await saveAccount(storage, user, password, masterPassword);
}

async function saveAccount(storage, user, password, masterPassword) {
  if (await isMasterPasswordValid(storage, masterPassword)) {
    const accounts = await getDecodedAccounts(storage, masterPassword);

    if (accounts[user]) {
      const { editAccount } = await inquirer.prompt({
        type: 'confirm',
        name: 'editAccount',
        message: 'This account already exists. Do you want to edit your password?'
      })
      if(!editAccount) {
        return
      }
    }

    accounts[user] = password;

    const ciphertext = getEncryptedString(accounts, masterPassword)
    await storage.setItem('accounts', ciphertext);
    console.log(`Account ${user} created!`)
  } else {
    console.error('Invalid password.')
  }
}

module.exports = addEditAccount
