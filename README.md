# ai-widget
Web Widget to connect to the Rasa conversational chatbot version 3.1 or later.
## Note
Require: `session_persistence: true`
## Features
1. Text Messages.
2. Quick Replies.
3. Images.
4. Markdown support.
5. Persistent sessions.
6. Easily configurable colors.
9. Emojis in basic and extended format.
10. Adapts to mobile devices automatically.
11. User interface automatically adapts to 5 languages.
12. Typing indications.
13. Smart delay between messages.
14. Does not require link to css style sheet.
## i18n
1. en
2. es
3. fr
4. pt
5. de

## Configuration options
|Attribute|Description|Default Value|
|---------|-----------|-------------|
|**data-is-open**|Start open widget: *open* for start open and online.|close|
|**data-websocket-url**| Web socket url address.|http://localhost:5005|
|**data-initial-payload**|Initial payload set to the bot.|/|
|**data-grad-a**|Header background gradient start color.|#243A4B|
|**data-grad-b**|Header background gradient end color.|#386370|
|**data-bg-client**|Background color in customer messages.|#386370|
|**data-client-color**|Text color in customer messages.|#FFFFFF|
|**data-show-time**|Show date and time on each message.|"true"|
|**data-brand**|Brand in header.|AI Widget|
|**data-slogan**|brand slogan.|Connect RASA with style.|
|**data-brand-avatar**|Widget logo or avatar URL.|default|
|**data-emoji**|*basic* or *complete* list of emojis.|basic|
|**data-height**|Widget height on laptops or desktop devices in pixels.|450|
|**data-width**|Widget width on laptops or desktop devices in pixels.|350|
