var builder = require('botbuilder')
var prompts = require('../prompts')
var client = require('redis').createClient(process.env.REDIS_URL)

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
            client.get(results.response, function (err, reply) {
                if (reply) {
                    session.send(prompts.sendCodeMessage1)
                    session.send(prompts.sendCodeMessage2)
                    session.beginDialog('/shareCode')
                } else {
                    session.send(prompts.codeFailMessage1)
                    session.beginDialog('/optin')
                }
            })
		},
	])
}