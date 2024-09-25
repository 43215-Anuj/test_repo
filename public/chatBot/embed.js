const EmbedChatBotURL = window.genAIEmbed;
const genAIBaseURL = EmbedChatBotURL.split("#")[0];
const BASE_URL = `${genAIBaseURL}chatBot/`;
const BUBBLE_CHAT_ICON = BASE_URL + "favicon.ico";
const CSS_URL = BASE_URL + "style.css"

// Html string to be appended to the body.
const htmlString = `
<link rel="stylesheet" href="${CSS_URL}">
    <iframe src="${EmbedChatBotURL}" title="Gen AI" width="99%" height="100%" frameBorder="0"></iframe>
`
document.body.insertAdjacentHTML("beforeend", htmlString)

