import {AiWidget} from './js/ui'



document.addEventListener('DOMContentLoaded', () => {
    window.customElements.define("ai-widget", AiWidget)
    let botContainer = document.querySelector('.ai-widget')
    let chatbot = document.createElement("ai-widget")
    for (const [k,v] of Object.entries(chatbot.defaults)){
        if (botContainer.dataset[k]!=undefined){
            chatbot.setAttribute(k,botContainer.dataset[k])
        }else {
            chatbot.setAttribute(k,v)
        }
    }
    botContainer.append(chatbot)
})

