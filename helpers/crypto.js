const CryptoJS = require("crypto-js");

function getSHA256String(value) {
  const hash = CryptoJS.SHA256(value);
  const hashString = hash.toString(CryptoJS.enc.Base64)

  return hashString
}

async function getDecodedAccounts(storage, masterPassword) {
  let decodedAccounts = {};
  const ciphertext = await storage.getItem('accounts');

  if (ciphertext) {
    const bytes  = CryptoJS.AES.decrypt(ciphertext, masterPassword);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    decodedAccounts = JSON.parse(originalText).accounts;
  }

  return decodedAccounts
}

function getEncryptedString(data, masterPassword) {
  return CryptoJS.AES.encrypt(JSON.stringify({
    accounts: data
  }), masterPassword).toString();
}

module.exports = {
  getSHA256String,
  getDecodedAccounts,
  getEncryptedString
}