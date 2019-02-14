const websiteUiDialog = require('../../src')

console.log(websiteUiDialog())

document.querySelector('body').innerHTML = `Demo: ${websiteUiDialog()}`
