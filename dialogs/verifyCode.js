var builder = require('botbuilder')
var prompts = require('../prompts')
var https = require('https')

module.exports = {
	addDialogs: addDialogs
}

   
function addDialogs(bot) {
	bot.add('/verifyCode', [
		function (session) {
            console.log('VERIFY AN INVITE CODE')

            var haveCodeActions = {
                "type": "Message",
                "attachments": [
                    {
                       "text": prompts.haveCodeMessage,
                        "actions": [
                            {
                                "title": "I don't have a code",
                                "message": "nocode"
                            },
                        ]
                    }
                ]
            }
			builder.Prompts.text(session, haveCodeActions)
		},
		function (session, results) {
            console.log('VERIFYING CODE: %s', results.response)
            if (results.response == 'nocode') {
                session.replaceDialog('/optout')
            } else {
                console.log('okay, go verify the code')
                https.get('https://9f8b4fe9.ngrok.io/verify?invitecode='+results.response, function(res) { 
                    if (res.statusCode==200) {
                        res.on('data', function(data) {
                            var friend = JSON.parse(data)
                            var verifiedCodeMessage = `Dope! That is definitely one of my secret codes, you just helped ${friend.first_name} move up the waitlist for my new album!`
                            session.send(verifiedCodeMessage)

                            var user_first_name = session.message.from.name.split(' ')[0] || session.userData.name
                            var verifiedCodeMessage2 = `btw ${user_first_name}, I still got you.`
                            session.send(verifiedCodeMessage2)

                            session.beginDialog('/shareCode')
                        })
                    } else {
                        session.send(prompts.codeFailMessage1)
                        session.beginDialog('/optin')
                    }
                }).on('error', function (err) {
                    console.log(`CHATBOT ERR: ${err.message}`)
                })
            }
		},
	])
}