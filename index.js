const ApiAiAssistant = require('actions-on-google').ApiAiAssistant;

const intents = [
    'hello_world',
];

exports.agent = function(request, response) {
    let assistant = new ApiAiAssistant({ request, response });
    let actionMap = new Map();
    intents.forEach(intent => actionMap.set(intent, require(`./${intents}`)));
    assistant.handleRequest(actionMap);
};