const ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
const request = require('request');
const FREEBOX_PROXY_URL = "http://[2a01:e35:8a6e:fe50:4013:a8ad:c6d3:cb9d]:3000/freebox";

const ACTION_TURNON = 'TurnOnFreebox';
console.log("Init");
exports.remotecontrol = function(req, res) {
	console.log("Creating assistant...");
	const assistant = new ApiAiAssistant({request: req, response: res});
	console.log("Assistant created");
	
	function turnOnFreebox(assistant) {
		console.log("TurnOnFreebox called");
		request(FREEBOX_PROXY_URL + "?key=power", function(error, response, body) {
     		
		    console.log("?key=power response: " + JSON.stringify(response) + " Body: " + body + " | Error: " + error);
		    const msg = "Freebox is On";
		    assistant.tell(msg);
	   	 });
	}
	
	const actionMap = new Map();
  	actionMap.set(ACTION_TURNON, turnOnFreebox);
	console.log("actionMap:");
	console.info(actionMap);
  	assistant.handleRequest(actionMap);
};

/*
const intents = [
    'hello_world',
];

exports.agent = function(request, response) {
    let assistant = new ApiAiAssistant({ request, response });
    let actionMap = new Map();
    intents.forEach(intent => actionMap.set(intent, require(`./${intents}`)));
    assistant.handleRequest(actionMap);
};
*/