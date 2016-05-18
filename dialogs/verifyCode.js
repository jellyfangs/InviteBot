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
    
function addDialogs(bot) {
	bot.add('/verifyCode', [
		function (session) {
			builder.Prompts.text(session, prompts.haveCodeMessage)
		},
		function (session, results) {
			session.send(results.response)
			session.endDialog()
		}
	])
}