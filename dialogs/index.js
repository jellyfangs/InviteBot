var builder = require('botbuilder')
var prompts = require('../prompts')

var createCode = require('./createCode')
var verifyCode = require('./verifyCode')
var noCode = require('./noCode')
var optin = require('./optin')

module.exports = {
	addDialogs: addDialogs
}

// triggers loading all the bot dialogs

var username = "Matt"

var welcomeActions = {
        "type": "Message",
        "attachments": [
            {
               "text": prompts.welcomeMessage,
                "actions": [
                    {
                        "title": "Yes!",
                        "message": "yes"
                    },
                    {
                        "title": "I have a secret code :)",
                        "message": "code"
                    }
                ]
            }
        ]
    }

var haveCodeActions = {
		"type": "Message",
        "attachments": [
            {
               "text": prompts.haveCodeMessage,
                "actions": [
                    {
                        "title": "Nevermind, I don't have one",
                        "message": "no"
                    },
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

function addDialogs(bot, addressConvert) {
	bot.add('/', new builder.CommandDialog()
		.matches('^(hello|yo|hi|hey|help)', builder.DialogAction.send(welcomeActions))
		.matches('^(yes|yeah|ya|yah)', '/createCode')
		.matches('^(code)', '/verifyCode')
		.matches('^(no|nope|nah|nevermind)', '/noCode')
		.matches('^(optin)', '/optin')
		.matches('^(bye|quit)', builder.DialogAction.endDialog(prompts.endMessage))
		.onDefault(builder.DialogAction.send(prompts.defaultMessage)))

	// add dialogs for commands
	createCode.addDialogs(bot)
	verifyCode.addDialogs(bot)
	noCode.addDialogs(bot)
	optin.addDialogs(bot)
	// runAsync.addDialogs(bot, addressConverter)
}