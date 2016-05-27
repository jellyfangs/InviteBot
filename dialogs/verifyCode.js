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

// WS8XH6
            
function addDialogs(bot) {
	bot.add('/verifyCode', [
		function (session) {
			builder.Prompts.text(session, prompts.haveCodeMessage)
		},
		function (session, results) {
            http.get('http://localhost:5000/rankup?user=' + results.response, function(res) { 
                res.setEncoding('utf8')
                res.on('data', function (data) {
                    if (data) {
                        var jsondata = JSON.parse(data)

                        var friendname = jsondata.user
                        var username = 'JERRY'
                        var userrank = ordinal_suffix_of(jsondata.rank)
                        var totalranks = jsondata.totals

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
            })
		},
	])
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}