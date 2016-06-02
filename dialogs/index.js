var builder = require('botbuilder')
var prompts = require('../prompts')

var createCode = require('./createCode')
var verifyCode = require('./verifyCode')
var shareCode = require('./shareCode')
var optout = require('./optout')
var optin = require('./optin')
var testCode = require('./testCode')

module.exports = {
	addDialogs: addDialogs
}

// triggers loading all the bot dialogs

// var username = session.message.from.name.split(' ')[0]
var username = "Jerry"
var welcomeMessage = `Yo ${username}! My new album 'Accelerate' is coming out soon, do you want me to send it to you before I send it to everyone else?`

var welcomeActions = {
        "type": "Message",
        "attachments": [
            {
               "text": welcomeMessage,
                "actions": [
                    {
                        "title": "Yes!",
                        "message": "new"
                    },
                    {
                        "title": "I have a secret code :)",
                        "message": "verify"
                    }
                ]
            }
        ]
    }


var noCodeActions = {
		"type": "Message",
        "attachments": [
            {
               "text": prompts.noCodeMessage,
                "actions": [
                    {
                        "title": "Yes!",
                        "message": "optin"
                    },
                    {
                        "title": "I have a secret code :)",
                        "message": "code"
                    },
                ]
            }
        ]
    }


function addDialogs(bot) {
    console.log(bot)
	bot.add('/', new builder.CommandDialog()
		// .matches('^(hello|yo|hi|hey)', builder.DialogAction.send(welcomeActions))
        .matches('^(help)', builder.DialogAction.send(prompts.helpMessage))
        // .matches('^(hello|yo|hi|hey)', '/testCode')
		.matches('^(new)', '/createCode')
		.matches('^(verify)', '/verifyCode')
		.matches('^(share)', '/shareCode')
		.matches('^(optout)', '/optout')
		.matches('^(optin)', '/optin')
		.matches('^(bye|quit)', builder.DialogAction.endDialog(prompts.endMessage))
		.onDefault(builder.DialogAction.send(randomDefault())))

	// add dialogs for commands
	createCode.addDialogs(bot)
	verifyCode.addDialogs(bot)
	shareCode.addDialogs(bot)
	optout.addDialogs(bot)
	optin.addDialogs(bot)
    // testCode.addDialogs(bot)
}


function randomDefault() {
	var defaultMessages = [prompts.defaultMessage, prompts.defaultMessage2, prompts.defaultMessage3]
	var randomDefault = defaultMessages[Math.floor(Math.random() * defaultMessages.length)]
	return randomDefault
}
