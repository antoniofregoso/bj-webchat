# Rdx Webchat
Web Component to connect to the Rasa conversational chatbot version 3.1 or later.
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

## Attributes
|Attribute|Description|Default Value|
|---------|-----------|-------------|
|**is-open**|Start open widget: *open* for start open and online.|close|
|**websocket-url**| Web socket url address.|http://localhost:5005|
|**initial-payload**|Initial payload set to the bot.|/|
|**grad-a**|Header background gradient start color.|#243A4B|
|**grad-b**|Header background gradient end color.|#386370|
|**bg-client**|Background color in customer messages.|#386370|
|**client-color**|Text color in customer messages.|#FFFFFF|
|**show-time**|Show date and time on each message.|"true"|
|**brand**|Brand in header.|AI Widget|
|**slogan**|brand slogan.|Connect RASA with style.|
|**brand-avatar**|Widget logo or avatar URL.|default|
|**emoji**|*basic* or *complete* set of emojis.|basic|
|**map-token**|Mapbox GL access token|none|
|**map-zoom**|Map zoom 0 to 15| 8 |
|**height**|Widget height on laptops or desktop devices in pixels.|450|
|**width**|Widget width on laptops or desktop devices in pixels.|350|
## i18n
Detect language based on web browser settings.
Languages available in the widget:
1. en
2. es
3. fr
4. pt
5. de

## Markdown to html
aiWidget uses **remarkable** to convert the markdown the **Rasa** responses to html.
You can handle:
1. Headings.
2. Horizontal Rules.
3. Typographic replacements.
4. Emphasis.
5. Blockquotes.
6. Lists.
7. Code.
8. Tables.
9. Images within paragraphs.
10. Footnotes.
11. Definition lists.
12. Abbreviations

[Here](https://jonschlinkert.github.io/remarkable/demo/) you can consult the syntax that can be handled.

## How to use

```html
<rdx-webchat
    websocket-url="https://192.168.100.87"
    emoji="complete"
    height="600"
    width="350"
    ... >
</rdx-webchat>
```


## Notes
1. Require: `session_persistence: true`
2. It is not convenient to use the complete set of emojis because the necessary training data is increased in a complex way for each emoji.