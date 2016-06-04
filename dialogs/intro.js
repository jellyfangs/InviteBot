var builder = require('botbuilder')
var prompts = require('../prompts')
var http = require('http')

module.exports = {
	addDialogs: addDialogs
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
        console.log('STEP 3 of WELCOME')
        console.log(session.userData)
        var username = session.message.from.name.split(' ')[0]
		session.send(`Hey! ${username}`)
        session.beginDialog('/shareCode')
	})

	bot.use(function (session, next) {
		if (!session.userData.optin) {
			session.beginDialog('/welcome')
		} else {
			next()
		}
	})

	bot.add('/welcome', [
		function (session) {
            console.log('STEP 1 of WELCOME')
            console.log(session.message.from.name)
            console.log(session.message.from.address)
            console.log(session.message.from.id)
            console.log(session.userData)

			var username = session.message.from.name.split(' ')[0]
			var welcomeMessage = `Yo, ${username}! My new album 'Accelerate' is coming out soon, do you want me to send it to you before I send it to everyone else?`
            var welcomeActions = {
                    "type": "Message",
                    "attachments": [
                        {
                           "text": welcomeMessage,
                            "actions": [
                                {
                                    "title": "Yes!",
                                    "message": "yes"
                                },
                                {
                                    "title": "I have a secret code :)",
                                    "message": "verify"
                                }
                            ]
                        }
                    ]
                }

			builder.Prompts.text(session, welcomeActions)
		},
		function (session, results, next) {
            console.log('STEP 2 of WELCOME')
            console.log(results)
            if (results.response=='yes') {
                session.userData.optin = true
                session.send('Yeahhh! Dope.')
                session.replaceDialog('/shareCode')
            } else if (results.response=='verify') {
                session.userData.optin = true
                // session.replaceDialog('/verifyCode')
            } else {
                session.replaceDialog('/optout')
            }
		},
	])
}



