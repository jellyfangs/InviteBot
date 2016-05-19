module.exports = {
	welcomeMessage: "Yo ${username}! My new album 'Accelerate' is coming out soon, do you want me to send it to you before I send it to everyone else?",
	// Yes!
	// I have a secret code :)

	getCodeMessage1: "Yeahhh! Dope. Out of my ${totalranks} fans you're going to be the ${userrank} person I send the new album to.",
	getCodeMessage2: function() {return `To get my album even sooner and to get a better place in line, tell your friends to message me at ${pageurl} and tell them to send me your secret code: ${invitecode}`},

	haveCodeMessage: "Cool. Paste your secret code into here and send it to me!",
	// Nevermind I don't have one

	noCodeMessage: "No worries! Who needs a secret code anyways. Do you still want me to send you my new album before I send it to everyone else?",
	// Yes!
	// I have a secret code :)

	sendCodeMessage1: "Dope! That is definitely one of my secret codes, you just helped ${friendname} move up the waitlist for my new album!",
	sendCodeMessage2: "btw ${username}, out of my ${totalranks} fans you're going to be the ${userrank} person I send the new album to.",

	codeFailMessage1: "Oh no! That's not one of the secret codes.",
	codeFailMessage2: "Want to try another code or do you want me to add you to the list of people who get my new album early?",
	// Try another code!
	// Add me to the list!

	endMessage: "Alright, I'll remember to ping you here when the album comes out! ttyl ${username}",
	endMessage2: "Alright, it was nice chatting. Hit me up when you want to hear more about my album!",

	defaultMessage: "I'm almost finished with my ablum 'Accelerate', I'll ping you as soon as it's done!",
	defaultMessage2: "I hear ya!",
	defaultMessage3: "I'll hit you up real soon!",

	helpMessage: 'Available commands are:\n' +
    '* new - generates a new invite code for you\n' +
    '* verify - verifies your invite code\n' +
    '* optin - updates whether you want updates\n' +
    '* bye - ends the conversation\n',
}