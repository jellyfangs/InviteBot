var builder = require('botbuilder')
var prompts = require('./prompts')

// export command dialog
module.exports = new builder.CommandDialog()
	.matches('^(hello|hi|howdy|help)', builder.DialogAction.send(prompts.welcomeMessage))
	.matches('^(yes)', getCode)
	.matches('^(code)', haveCode)
	.matches('^(no|nevermind)', noCode);

function getCode(session, args) {
	session.send(prompts.getCodeMessage1);
	session.send(prompts.getCodeMessage2);
	session.send(prompts.getCodeMessage3);
}

function haveCode(session, args) {
	codeSuccess(session)
}

function noCode(session, args) {
	session.send(prompts.noCodeMessage);
}

function codeSuccess(session) {
	session.send(prompts.sendCodeMessage1);
	session.send(prompts.sendCodeMessage2);
}

function codeFail(session) {
	session.send(prompts.codeFailMessage1);
	session.send(prompts.codeFailMessage2);
}