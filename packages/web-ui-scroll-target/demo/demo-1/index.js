const webUiScrollTarget = require('../../src')

console.log(webUiScrollTarget())

document.querySelector('body').innerHTML = `Demo: ${webUiScrollTarget()}`
