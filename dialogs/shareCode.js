var builder = require('botbuilder')
var prompts = require('../prompts')
var http = require('http')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/shareCode', [
		function (session) {
			if (!session.userData.invitecode) {
				// http://localhost:3978/rank?userid=10001&first_name=test&last_name=test
				http.get('http://localhost:3978/rank?userid=' + session.message.from.id + '&first_name=' + session.message.from.name + '&last_name=' + session.message.from.name, function(res) {
					res.setEncoding('utf8')
					res.on('data', function(err, data) {
						if (err) console.log(err)
						console.log('api returned %s', data)
					})
				})
			}
			else {
				// http://localhost:3978/lookup?userid=10001
				http.get('http://localhost:3978/lookup?userid=' + session.message.from.id, function(res) {
					res.setEncoding('utf8')
					res.on('data', function(err, data) {
						if (err) console.log(err)
						console.log('api returned %s', data)
					})
				})
			}
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