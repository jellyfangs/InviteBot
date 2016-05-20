var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
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

 var badCodeActions = {
		"type": "Message",
        "attachments": [
            {
               "text": prompts.codeFailMessage2,
                "actions": [
                    {
                        "title": "Try another code!",
                        "message": "verify"
                    },
                    {
                        "title": "Add me to the list!",
                        "message": "optin"
                    },
                ]
            }
        ]
    }

function addDialogs(bot) {
	bot.add('/verifyCode', [
		function (session) {
			builder.Prompts.text(session, prompts.haveCodeMessage)
		},
		function (session, results) {
			if (verifyCodes(results.response)) {
				session.send(prompts.sendCodeMessage1)
				session.send(prompts.sendCodeMessage2)
				session.beginDialog('/shareCode')
			} else {
				session.send(prompts.codeFailMessage1)
				session.beginDialog('/optin')
			}
		},
	])
}

var codes = ['TEST1', 'TEST2', 'TEST3']

function verifyCodes(results) {
	var i = codes.length
	while (i--) {
		if (codes[i] === results) {
			return true
		}
	}
	return false
}