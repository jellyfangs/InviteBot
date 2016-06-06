var builder = require('botbuilder')
var prompts = require('../prompts')
var http = require('http')

module.exports = {
	addDialogs: addDialogs
}


function addDialogs(bot) {
	bot.add('/intro', [
		function (session) {
            // set the first run so the bot alternates to intro instead
            session.userData.firstRun = true

            // send an image message
            var snap = new builder.Message()
                .addAttachment({
                    contentUrl: "https://hamadamania.files.wordpress.com/2015/02/jason-derulo-taylor-parks.jpg",
                    contentType: "image/jpeg"
                })
            session.send(snap)

            // create custom intro message
			var username = session.message.from.name.split(' ')[0]
			var introMessage = `Yo, ${username}! My new album 'Accelerate' is coming out soon, do you want me to send it to you before I send it to everyone else?`

            // create intro actions
            var introActions = {
                    "type": "Message",
                    "attachments": [
                        {
                           "text": introMessage,
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

            // reply back with intro
			builder.Prompts.text(session, introActions)
		},
		function (session, results) {
            // what did user decide
            console.log(results)

            if (results.response=='yes') {
                session.send('Yeahh! Dope.')
                session.replaceDialog('/shareCode')
            } else if (results.response=='verify') {
                session.replaceDialog('/verifyCode')
            } else {
                session.replaceDialog('/optout')
            }
		},
	])
}



