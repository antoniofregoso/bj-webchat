/*!
 * rdx-webchat v1.0.0
 * (c) 2022 Antonio Fregoso - https:///
 * Released under License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).
 */

import { io } from 'socket.io-client';
import { Remarkable } from 'remarkable';
import { createPopup } from '@picmo/popup-picker';
import { es, pt, fr, de, imputMessage } from './i18n';
import  mapboxgl  from 'mapbox-gl';

export class RdxWebchat  extends HTMLElement {

    isOpen = this.getAttribute("is-open") || false;
    websocketUrl = this.getAttribute("websocket-url") || "http://0.0.0.0:5005";
    initialPayload = this.getAttribute("initial-payload") || "/";
    gradA = this.getAttribute("grad-a") || "#243A4B";
    gradB = this.getAttribute("grad-b") || "#386370";
    bgClient = this.getAttribute("bg-client") || "#386370";
    clientColor = this.getAttribute("client-color") || "#FFFFFF";
    showTime = this.getAttribute("show-time") || true;
    brand = this.getAttribute("brand") || "Rdx Webchat";
    slogan = this.getAttribute("slogan") || "Connect RASA with style";
    brandAvatar = this.getAttribute("brand-avatar") || "default";
    emojis = this.getAttribute("emojis") || "basic";
    //isOpen = this.getAttribute("map-token") || undefined;
    //isOpen = this.getAttribute("map-zoom") || 8;
    height = this.getAttribute("height") || 450;
    width = this.getAttribute("width") || 350;
    online = false;
    open=false;
    uuid= false
    socket = false;
    lang = navigator.language || navigator.userLanguage;
    icons = {
        isClicked: '<svg x="0px" y="0px" viewBox="0 0 30 30" width="30" height="30" xmlns="http://www.w3.org/2000/svg"> <g id="g4"      transform="matrix(0.06696429,0,0,0.06696429,-2.1428571,-2.2098214)"><path d="M 256,33 C 132.3,33 32,133.3 32,257 32,380.7 132.3,481 256,481 379.7,481 480,380.7 480,257 480,133.3 379.7,33 256,33 Z m 108.3,299.5 c 1.5,1.5 2.3,3.5 2.3,5.6 0,2.1 -0.8,4.2 -2.3,5.6 l -21.6,21.7 c -1.6,1.6 -3.6,2.3 -5.6,2.3 -2,0 -4.1,-0.8 -5.6,-2.3 L 256,289.8 180.6,365.5 c -1.5,1.6 -3.6,2.3 -5.6,2.3 -2,0 -4.1,-0.8 -5.6,-2.3 l -21.6,-21.7 c -1.5,-1.5 -2.3,-3.5 -2.3,-5.6 0,-2.1 0.8,-4.2 2.3,-5.6 l 75.7,-76 -75.9,-75 c -3.1,-3.1 -3.1,-8.2 0,-11.3 l 21.6,-21.7 c 1.5,-1.5 3.5,-2.3 5.6,-2.3 2.1,0 4.1,0.8 5.6,2.3 l 75.7,74.7 75.7,-74.7 c 1.5,-1.5 3.5,-2.3 5.6,-2.3 2.1,0 4.1,0.8 5.6,2.3 l 21.6,21.7 c 3.1,3.1 3.1,8.2 0,11.3 l -75.9,75 z"  id="path2" fill="' + this.gradA + '" /></g></svg>',
        isNotClicked: '<svg x="0px" y="0px" viewBox="0 0 30 30" width="30" height="30" xmlns="http://www.w3.org/2000/svg"> <g id="XMLID_1202_"    transform="matrix(0.06521739,0,0,0.06519286,0,-0.38460043)"> 	<g id="g8"> <g    id="g6"> <path    d="M 440.047,396.143 C 426.855,390.936 415.321,381.986 407.003,370.333 439.582,348.319 460,316.762 460,281.701 c 0,-38.367 -24.445,-72.543 -62.527,-94.602 -4.023,92.95 -102.669,159.14 -213.667,159.14 -9.342,0 -18.6,-0.481 -27.755,-1.387 28.905,34.387 80.701,57.309 139.8,57.309 21.556,0 42.138,-3.055 60.996,-8.597 16.873,15.79 40.876,23.447 65.237,18.454 6.542,-1.341 12.702,-3.51 18.395,-6.376 1.834,-0.923 2.955,-2.838 2.862,-4.889 -0.094,-2.053 -1.384,-3.856 -3.294,-4.61 z"     id="path2" fill="' + this.gradA + '"  /> <path d="M 367.612,181.353 C 367.612,106.858 285.319,46.468 183.806,46.468 82.293,46.468 0,106.858 0,181.353 0,220.61 22.86,255.945 59.337,280.594 49.767,294 36.4,304.212 21.124,309.968 c -1.919,0.723 -3.236,2.503 -3.364,4.55 -0.128,2.047 0.958,3.978 2.773,4.934 11.88,6.254 25.231,9.519 38.572,9.519 21.307,0 41.377,-8.301 56.401,-22.36 21.116,6.206 44.163,9.627 68.301,9.627 101.513,0 183.805,-60.39 183.805,-134.885 z"  id="path2" fill="' + this.gradA + '"  /> </g> </g> </g> </svg>'
    }
    sendIcon = '<svg x="0px" y="0px" viewBox="0 0 30 30" width="30" height="30" xmlns="http://www.w3.org/2000/svg"><g id="send" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="ic_fluent_send_28_filled" fill="#212121" fill-rule="nonzero"><path d="M3.78963301,2.77233335 L24.8609339,12.8499121 C25.4837277,13.1477699 25.7471402,13.8941055 25.4492823,14.5168992 C25.326107,14.7744476 25.1184823,14.9820723 24.8609339,15.1052476 L3.78963301,25.1828263 C3.16683929,25.4806842 2.42050372,25.2172716 2.12264586,24.5944779 C1.99321184,24.3238431 1.96542524,24.015685 2.04435886,23.7262618 L4.15190935,15.9983421 C4.204709,15.8047375 4.36814355,15.6614577 4.56699265,15.634447 L14.7775879,14.2474874 C14.8655834,14.2349166 14.938494,14.177091 14.9721837,14.0981464 L14.9897199,14.0353553 C15.0064567,13.9181981 14.9390703,13.8084248 14.8334007,13.7671556 L14.7775879,13.7525126 L4.57894108,12.3655968 C4.38011873,12.3385589 4.21671819,12.1952832 4.16392965,12.0016992 L2.04435886,4.22889788 C1.8627142,3.56286745 2.25538645,2.87569101 2.92141688,2.69404635 C3.21084015,2.61511273 3.51899823,2.64289932 3.78963301,2.77233335 Z"  id="path2" fill="' + this.clientColor + '"></path> </g> </g></svg>'
    brandIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><path d="m 39.56634,14.579155 c 0,8.048627 -6.526363,14.577073 -14.577072,14.577073 -8.050709,0 -14.577073,-6.528446 -14.577073,-14.577073 C 10.412195,6.5263637 16.938559,0 24.989268,0 33.039977,0 39.56634,6.5263637 39.56634,14.579155 Z m -3.327737,14.951912 c -3.136153,2.367733 -7.026149,3.790039 -11.249335,3.790039 -4.227351,0 -8.11943,-1.426471 -11.259748,-3.794204 C 5.2498287,33.260715 0,44.886972 0,49.978535 h 49.978535 c 0,-5.045749 -5.414341,-16.672006 -13.739932,-20.447468 z" fill="' + this.clientColor + '"/></svg>'
    responsesQueue = []

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }


    /**
     * Detect if the widget is running on a mobile device.
     */
    isMobile() {
        var match = window.matchMedia || window.msMatchMedia;
        if(match) {
            var mq = match("(pointer:coarse)");
            return mq.matches;
        }
        return false;
    }


    /**
     * Open and close the widget.
     * @param  {event} e
     */
    toogleOpen(e){
        if(this.open) {
            e.preventDefault();
            this.botSuport.classList.remove('bot-open');
            this.botButton.children[0].innerHTML = this.icons.isNotClicked;
            this.open=false;
        } else if (this.open===false) {
            e.preventDefault();
            if (this.online===false){this.openSocket()};
            this.botSuport.classList.add('bot-open');
            this.botButton.children[0].innerHTML = this.icons.isClicked;
            this.open=true;
        }
    }

    appendMessage(msg, botMessages){
        const item = document.createElement('div')
        item.innerHTML = msg
        if (this.showTime===true){
            const itemTime = document.createElement('span')
            const d = new Date()
            itemTime.textContent =d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
            item.appendChild(itemTime) 
        }
        item.classList.add('messages-item', 'is-client')
        botMessages.insertBefore(item, botMessages.children[0])
        botMessages.scrollTop = botMessages.scrollHeight
    }

    appendResponse(response, botMessages){
        var md = new Remarkable()
        const item = document.createElement('div');
        item.classList.add('messages-item', 'is-bot');
        if (response['text']!==undefined){
            let msg = md.render(response.text)
            item.innerHTML = msg
        }
        if (response['attachment']!==undefined){
            if (response['attachment']['type']==='image'){
                const img = document.createElement('img')
                img.src = response['attachment']['payload']['src']
                item.appendChild(img)                                
            }
            if (response['attachment']['type']==='video'){
                if (response['attachment']['payload']['src'].includes('https://www.youtube.com/')){
                    console.log(response['attachment']['payload']['src'])
                    console.log(response['attachment']['payload']['src'].replace('watch', 'embebed'))
                    const video = document.createElement('div')
                    video.classList.add('messages-video')
                    video.innerHTML = /*html*/`
                        <iframe width="560" height="315" src="${response['attachment']['payload']['src'].replace('watch', 'embebed')}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    item.appendChild(video)
                } else {
                    const video = document.createElement('video')
                    video.src = response['attachment']['payload']['src']
                    item.appendChild(video)
                }                
            }
            if (response['custom']!==undefined){
                if (response['custom']['content_type']==='image'){
                    item.innerHTML = /*html*/`
                    <img src="${response['custom']['payload']['src']}"/>
                    <h1>${response['custom']['payload']['title']}</h1>
                    ${response['custom']['payload']['description']!==undefined?`<p>${response['custom']['payload']['description']}</p>`:""}
                `
                }
                if (response['custom']['content_type']==='location'){
                    mapboxgl.accessToken = "pk.eyJ1IjoiYW50b25pb2ZyZWdvc28iLCJhIjoiY2t2NnZsYjRtMjJ0NjJxbXMwN2g1ajg5YyJ9.pD7yaooCH5IqBdc4jftIrA"
                    const map = new mapboxgl.Map({
                        container: item,
                        //style: 'mapbox://styles/mapbox/streets-v11', 
                        enter: [-99.21646907316129, 19.29342060773046]
                    })
                }

            }
            if (response['quick_replies']!==undefined){
                item.classList.remove('is-bot')
                item.classList.add("messages-quick-replies")
                const buttonsContainer = document.createElement('div')
                response['quick_replies'].forEach(quickReply => {
                    const quickReplyButton = document.createElement('button')
                    quickReplyButton.innerHTML = quickReply.title
                    quickReplyButton.classList.add("button")
                    quickReplyButton.addEventListener("click", e => {
                        const quickReplyItem = document.createElement('div')
                        quickReplyItem.innerHTML = quickReply.title
                        const itemTime = document.createElement('span')
                        const d = new Date()
                        itemTime.textContent =d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
                        quickReplyItem.appendChild(itemTime) 
                        quickReplyItem.classList.add('messages-item', 'is-client')
                        botMessages.insertBefore(quickReplyItem, botMessages.children[0])
                        botMessages.scrollTop = botMessages.scrollHeight
                        quickReplyItem.remove()
                        this.socket.emit('user_uttered', {
                            "message": quickReply.payload,
                        })
                    })
                    buttonsContainer.appendChild(quickReplyButton)
                })
                item.appendChild(buttonsContainer)
            } 
        }
        if (this.showTime===true){
            const itemTime = document.createElement('span')             
            const d = new Date()
            itemTime.textContent =d.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
            item.appendChild(itemTime)
        }
        console.log('Item', item)
        botMessages.insertBefore(item, botMessages.children[0])
        botMessages.scrollTop = botMessages.scrollHeight  
    }

    #getSessionId(){
        const cDecoded = decodeURIComponent(document.cookie)
        const cArr = cDecoded .split('; ')
        var uuid
        cArr.forEach(val => {
            if (val.indexOf('uuid=') === 0) uuid = val.substring('uuid='.length)
        })
        if (uuid===undefined){
            uuid = crypto.randomUUID()
            let date = new Date()
            date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000))
            const expires = "expires=" + date.toUTCString()
            document.cookie = "uuid=" + uuid + ", " + expires + ", path=/ ; SameSite=None; Secure"
        }
        return uuid
    }

    openSocket(){
        this.uuid = this.#getSessionId()
        var socket = io(this.websocketUrl, { autoConnect: true})
        socket.on('connect',()=>{
            console.log('SOCKET: connected to the socket server', socket.connected, this.uuid) 
            socket.emit('session_request', { session_id: this.uuid })
            if (this.initialPayload != '/'){
                socket.emit('user_uttered', {
                  "session_id": this.uuid, 
                  "message": this.initialPayload,
                });
                console.log('sendig payload')
              };
            this.setAttribute('online',true)
        })
        socket.on('error', (err) => {
            console.log('SOCKET: errors', err)
            this.setAttribute('online',false)
        })
        socket.on('connect_error', (error) => {
            console.log('SOCKET: connect_error ---->', error)
            this.setAttribute('online',false)
        })

        socket.on('disconnect', (reason) => {
            console.log(reason)
          })
        
        socket.on('bot_uttered', (response) =>{
            console.log(response)
            this.appendResponse(response, this.botMesagges)
        })
        this.socket = socket
    }

    connectedCallback() {
        this.shadowRoot.innerHTML =/*html*/ `
        <style>            
            .bot-container {
                position: fixed;
                bottom: 30px;
                right: 30px;
                font-family: 'Fredoka', sans-serif; 
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                border: 5px;
            }
            .bot-suport {
                display: flex;
                flex-direction: column;
                background: #f9f9f9;
                height: ${(this.isMobile())?(screen.height-100)+'px':this.height+'px'};
                width: ${(this.isMobile())?'100%':this.width+'px'};
                z-index: -123456;
                opacity: 0;
                transition: all .5s ease-in-out;
                box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
            }
            .bot-open {
                transform: translateY(-40px);
                z-index: 123456;
                opacity: 1;
            }
            .bot-close {
                display: none;
            }
            .bot-button {
                text-align: right;
            }
            .bot-button button,
            .bot-button button:focus,
            .bot-button button:visited {
                padding: 10px;
                background: white;
                border: none;
                outline: none;
                border-top-left-radius: 50px;
                border-top-right-radius: 50px;
                border-bottom-left-radius: 50px;
                box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
                cursor: pointer;
            }
            .bot-header {
                position: sticky;
                top: 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding: 0.5rem;
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
                background: linear-gradient(93.12deg, ${this.gradA} 0.52%, ${this.gradB} 100%);
            }
            .bot-header div h1 {
                font-size: 1rem;
                color: white;

            }
            .bot-header div p {
                font-size: .9rem;
                color: white;
                
            }
            .bot-header-image {
                margin-right: 15px;                
            }
            .bot-header-image img {
                width:50px;
                height:50px;
            }
            .bot-messages {
                padding: 0px 20px 20px 20px;
                display: flex;
                flex-direction: column;
                overflow-y: scroll;
                overflow-x: hidden;
                flex-direction: column-reverse;
                background-color:#eee;
            }
            .messages-quick-replies {
                margin-top: 10px;
                margin: auto;
                border-radius: 20px;
                background-color:white;
            }
            .messages-quick-replies button {
                margin-left: 5px;
                margin-right: 5px;
                padding: 5px 10px 5px 10px;
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
            }
            .messages-quick-replies div {
                text-align: center;
            }
            .messages-item {
                width: fit-content;
                margin-top: 10px;
                padding: 8px 12px;
                font-size: medium;
                box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
            }
            .messages-item img {
                width: 100%;
                height: auto;
            }
            .messages-item video {
                width: 100%;
                height: auto;
            }
            .messages-video {
                width: 90%;
                height: auto;
            }
            .messages-item ul {
                margin-left: 5px;
                list-style-type: disc;
            }
            .messages-item ol {
                margin-left: 5px;
            }
            .messages-item a:link {
                font-style: italic;
                color:inherit;
            }
            .messages-item h1 {
                font-size: 1.0em;
            }

            .messages-item span {
                display: block;
                font-size: 0.7em;
            }
            .is-client {
                margin-left: auto;
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                border-bottom-left-radius: 20px;
                color: ${this.clientColor};
                background-color:${this.bgClient};
            }
            .is-bot {
                margin-right: auto;
                border-top-left-radius: 20px;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
                background-color:white;
            }
            .typing {
                position: relative;
                }
                .typing__dot {
                float: left;
                width: 8px;
                height: 8px;
                margin: 0 4px;
                background: #8d8c91;
                border-radius: 50%;
                opacity: 0;
                animation: loadingFade 1s infinite;
                }              
                .typing__dot:nth-child(1) {
                animation-delay: 0s;
                }              
                .typing__dot:nth-child(2) {
                animation-delay: 0.2s;
                }              
                .typing__dot:nth-child(3) {
                animation-delay: 0.4s;
                }
                @keyframes loadingFade {
                0% {
                    opacity: 0;
                    transform: translateY(0px);
                }
                50% {
                    opacity: 0.8;
                    transform: translateY(8px);
                }
                100% {
                    opacity: 0;
                    transform: translateY(0px);
                }
                }
            .bot-footer {
                position: sticky;
                bottom: 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding: 20px 20px;
                box-shadow: 0px -10px 15px rgba(0, 0, 0, 0.1);
                border-bottom-right-radius: 10px;
                border-bottom-left-radius: 10px;
                background: linear-gradient(93.12deg, ${this.gradB} 0.52%, ${this.gradA} 100%);
            }
            .bot-footer input {
                flex-grow:2;
                border: none;
                padding: 10px 10px;
                border-radius: 30px;
                text-align: left;
                width: 85%;
            }
            .bot-footer span {
                padding-left: 10px;
                font-size: 1.2rem;
                cursor: pointer; 
            }
            .bot-footer button {
                background-color: transparent;
                border: none;
                outline:none;
                cursor: pointer; 
            }
            .bot-footer:hover button {
                transform: translatex(4px);
            }
        </style>
            <div class="bot-container">
            <div class="bot-suport">
                <div class="bot-header">
                    <div class="bot-header-image">
                        ${this.brandAvatar!='default'?`<img src="${this.brandAvatar}"/>`:this.brandIcon}
                    </div>
                    <div class="bot-header-content">
                        <h1>${this.brand}</h1>
                        ${this.isMobile()===false?`<p>${this.slogan}</p>`:''}
                        
                    </div>
                </div>
                <div class="bot-messages">
                </div>
                <form class="bot-footer">
                    <input type="text" placeholder="${(this.lang.substring(0,2) in imputMessage)?imputMessage[this.lang.substring(0,2)]:imputMessage['en']}"/>
                    <span>&#128512</span>
                    <button>${this.sendIcon}</button>
                </form>
            </div>
            <div class="pickerContainer"></div>
            <div class="bot-button">
                <button>${this.icons.isNotClicked}</button>
            </div>
        </div>
        `        
        this.botSuport= this.shadowRoot.querySelector('.bot-suport');
        this.botHeader = this.shadowRoot.querySelector('.bot-header')
        this.botMesagges = this.shadowRoot.querySelector('.bot-messages');
        this.botFooter = this.shadowRoot.querySelector('.bot-footer');
        this.bootImput = this.shadowRoot.querySelector('form.bot-footer input');
        this.emojisButton = this.shadowRoot.querySelector('form.bot-footer span');
        this.botButton = this.shadowRoot.querySelector('.bot-button');
        let botMesaggesHeight = this.botSuport.offsetHeight - this.botHeader.offsetHeight - this.botFooter.offsetHeight;
        this.botMesagges.style.height = botMesaggesHeight.toString()+'px';
        if (this.isOpen=='open'){
            this.botSuport.classList.add('bot-open');
            this.botSuport.classList.remove('bot-close')
            this.botButton.children[0].innerHTML = this.icons.isClicked;
            this.open = true;
            if (this.onLine===false){this.openSocket()}
        };     
        this.botFooter.addEventListener('submit',e=>{
            e.preventDefault();
            const msg =  this.bootImput.value;
            if (msg){
                this.socket.emit('user_uttered', {
                    "session_id": this.uuid,
                    "message": msg,
                })
                this.bootImput.value = '';
                this.appendMessage(msg, this.botMesagges);           
            }

        });
        var pickerOptions = { 
            showPreview:false, 
            showRecents:false, 
            showSearch:false,
            showVariants:false,
            showCategoryTabs:false,
            categories:["smileys-emotion"]};  
        switch (this.lang.substring(0,2)){
            case 'es':
                pickerOptions['i18n'] = es;
                break;
            case 'fr':
                pickerOptions['i18n'] = fr;
            case 'pt':
                pickerOptions['i18n'] = pt;          
            case 'de':
                pickerOptions['i18n'] = de;
        }      
        if (this.emoji=='complete'){
            delete pickerOptions['showSearch']
            delete pickerOptions['showVariants']
            delete pickerOptions['showCategoryTabs']
            delete pickerOptions['categories']
        }
        const picker = createPopup(pickerOptions,{
            referenceElement: this.emojisButton,
            triggerElement: this.emojisButton
        })
        this.emojisButton.addEventListener('click', e => {
            e.stopPropagation();
            picker.toggle();
        })
        picker.addEventListener('emoji:select', e =>{
            this.bootImput.value = this.bootImput.value.concat(e.emoji);
        })
        this.botButton.addEventListener('click', e => this.toogleOpen(e));
        open = this.open;  


    }

    disconnectedCallback() {
        this.botFooter.removeEventListener('submit');
    }

}

customElements.define("rdx-webchat", RdxWebchat);