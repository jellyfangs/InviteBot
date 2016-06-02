var builder = require('botbuilder')
var prompts = require('../prompts')

var intro = require('./intro')
var verifyCode = require('./verifyCode')
var shareCode = require('./shareCode')
var optout = require('./optout')
var optin = require('./optin')

module.exports = {
	addDialogs: addDialogs
}

// triggers loading all the bot dialogs
function addDialogs(bot) {
    console.log(bot)
	bot.add('/', new builder.CommandDialog()
        .matches('^(help)', builder.DialogAction.send(prompts.helpMessage))
		.matches('^(hello|yo|hi|hey)', '/intro')
		.matches('^(verify)', '/verifyCode')
		.matches('^(share)', '/shareCode')
		.matches('^(optout)', '/optout')
		.matches('^(optin)', '/optin')
		.matches('^(bye|quit)', builder.DialogAction.endDialog(prompts.endMessage))
		.onDefault(builder.DialogAction.send(randomDefault())))

	// add dialogs for commands
    intro.addDialogs(bot)
	verifyCode.addDialogs(bot)
	shareCode.addDialogs(bot)
	optout.addDialogs(bot)
	optin.addDialogs(bot)
}


function randomDefault() {
	var defaultMessages = [prompts.defaultMessage, prompts.defaultMessage2, prompts.defaultMessage3]
	var randomDefault = defaultMessages[Math.floor(Math.random() * defaultMessages.length)]
	return randomDefault
}
