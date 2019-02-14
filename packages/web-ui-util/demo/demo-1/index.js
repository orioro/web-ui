const @orioro/webUiUtil = require('../../src')

console.log(@orioro/webUiUtil())

document.querySelector('body').innerHTML = `Demo: ${@orioro/webUiUtil()}`
