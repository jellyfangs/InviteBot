var builder = require('botbuilder')
var prompts = require('../prompts')
var http = require('http')

module.exports = {
	addDialogs: addDialogs
}

var welcomeActions = {
        "type": "Message",
        "attachments": [
            {
               "text": prompts.welcomeMessage,
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
	bot.add('/intro', function (session) {
		session.send('Hey!')
		session.replaceDialog('/shareCode')
	})

	bot.use(function (session, next) {
		if (!session.userData.optin) {
			session.userData.optin = true
			session.beginDialog('/welcome')
		} else {
			next()
		}
	})

	bot.add('/welcome', [
		function (session) {
			var username = session.message.from.name.split(' ')[0]
			var welcomeMessage = `Yo ${username}! My new album 'Accelerate' is coming out soon, do you want me to send it to you before I send it to everyone else?`

			builder.Prompts.confirm(session, welcomeMessage)
		},
		function (session, results) {
			session.userData.optin = true
			session.send('Yeahhh! Dope.')
			session.replaceDialog('/shareCode')
		},
	])
}



