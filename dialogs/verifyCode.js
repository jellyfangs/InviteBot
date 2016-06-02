var builder = require('botbuilder')
var prompts = require('../prompts')
var http = require('http')

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
            http.get({
                protocol: 'http:',
                host: 'localhost',
                port: 3978,
                path: '/verify?invitecode=%s'.replace('%s', results.response)
            }, function(res) { 
                if (res.statusCode==200) {
                    res.on('data', function(data) {
                        var friend = JSON.parse(data)
                        var verifiedCodeMessage = `Dope! That is definitely one of my secret codes, you just helped ${friend.first_name} move up the waitlist for my new album!`
                        session.send(verifiedCodeMessage)
                        session.beginDialog('/shareCode')
                    })
                } else {
                    session.send(prompts.codeFailMessage1)
                    session.beginDialog('/optin')
                }
            }).on('error', function (err) {
                console.log(`CHATBOT ERR: ${err.message}`)
            })
		},
	])
}