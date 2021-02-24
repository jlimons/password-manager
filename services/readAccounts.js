const { readMasterPassword } = require('../helpers/inquirer');
const { getDecodedAccounts } = require('../helpers/crypto');
const {
  isMasterPasswordValid,
  checkRobustness
} = require('../helpers/password');

async function readAccounts(storage) {
  const masterPassword = await readMasterPassword();
  
  if (await isMasterPasswordValid(storage, masterPassword)) {
    const accounts = await getDecodedAccounts(storage, masterPassword);
    const displayArray = []
    for (const key in accounts) {
      displayArray.push({
        account: key,
        password: accounts[key],
        security: checkRobustness(accounts[key])
      })
    }
    console.table(displayArray)

  } else {
    console.log('Invalid password!')
  }
}

module.exports = readAccounts
