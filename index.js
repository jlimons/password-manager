#!/usr/bin/env node

const inquirer = require('inquirer')
const storage = require('node-persist')
const { program } = require('commander');

const addEditAccount = require('./services/addEditAccount')
const readAccounts = require('./services/readAccounts')
const generatePassword = require('./services/generatePassword')
const { readMasterPassword } = require('./helpers/inquirer')
const { 
  getSHA256String,
} = require('./helpers/crypto')

const menuOptions = [{
  name: 'Read accounts',
  value: 0
}, {
  name: 'Add/edit account',
  value: 1
},{
  name: 'Generate password',
  value: 2
}]

async function init() {
  try {
    await storage.init();
    if (!(await hasMasterPassword())) {
      createMasterPassword()
    } else {
      const answers = await inquirer
        .prompt([
          {
            type: 'list',
            name: 'menu',
            message: 'Menu',
            choices: menuOptions
          }
        ])
      processMenuOption(answers.menu)
    }

  } catch (error) {
    console.error('Error: ', error)
  }
}

async function processMenuOption(option) {
  switch (option) {
    case 0:
      await readAccounts(storage)
      init()
      break;
    case 1:
      await addEditAccount(storage)
      init()
      break;
    case 2:
      generatePassword()
      init()
      break;
    default:
      break;
  }
}

async function createMasterPassword() {
  const masterPassword = await readMasterPassword();
  const hashString = await getSHA256String(masterPassword);
  await storage.setItem('masterPassword', hashString);
  console.log('Master password created!')
  init();
}

async function hasMasterPassword() {
  let result = false
  const masterPassword = await storage.getItem('masterPassword');
  
  if (masterPassword) {
    result = true
  }
  return result
}

program
  .version('1.0.0')
  .description('Password Manager System')
  .action(init)

  program.parse(process.argv)
