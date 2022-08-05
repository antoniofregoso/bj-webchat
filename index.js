/*!
 * ai-widget v1.0.0
 * (c) 2022 Antonio Fregoso - https://www.antoniofregoso.com/
 * Released under License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).
 */

import {AiWidget} from './js/ui'


/**
 * Initializes the component, loads the configuration options, and adds it to the container.
 */
document.addEventListener('DOMContentLoaded', () => {
    window.customElements.define("ai-widget", AiWidget)
    let botContainer = document.querySelector('.ai-widget')
    let chatbot = document.createElement("ai-widget")
    for (const [k,v] of Object.entries(chatbot.defaults)){
        if (botContainer.dataset[k]!=undefined){
            chatbot.setAttribute(k,botContainer.dataset[k])
        } else {
            chatbot.setAttribute(k,v)
        }
    }
    botContainer.append(chatbot)
})

