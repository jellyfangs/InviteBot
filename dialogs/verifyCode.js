var builder = require('botbuilder')
var prompts = require('../prompts')
var bluebird = require('bluebird')
var client = require('redis').createClient(process.env.REDIS_URL)

bluebird.promisifyAll(client)

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

// WS8XH6
            
function addDialogs(bot) {
	bot.add('/verifyCode', [
		function (session) {
			builder.Prompts.text(session, prompts.haveCodeMessage)
		},
		function (session, results) {
            client.get(results.response, function (err, reply) {
                if (reply) {
                    var friendname = reply
                    var username = 'JERRY'
                    var totalranks = '4'
                    var userrank = '5'
                    var sendCodeMessage1 = `Dope! That is definitely one of my secret codes, you just helped ${friendname} move up the waitlist for my new album!`
                    var sendCodeMessage2 = `btw ${username}, out of my ${totalranks} fans you're going to be the ${userrank} person I send the new album to.`

                    session.send(sendCodeMessage1)
                    session.send(sendCodeMessage2)
                    session.beginDialog('/shareCode')
                } else {
                    session.send(prompts.codeFailMessage1)
                    session.beginDialog('/optin')
                }
            })
		},
	])
}