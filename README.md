# aiWidget
Web Widget to connect to the Rasa conversational chatbot version 3.1 or later.
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
|**data-emoji**|*basic* or *complete* set of emojis.|basic|
|**data-map-token**|Mapbox GL access token|none|
|**data-map-zoom**|Map zoom 0 to 15| 8 |
|**data-height**|Widget height on laptops or desktop devices in pixels.|450|
|**data-width**|Widget width on laptops or desktop devices in pixels.|350|
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

### Standalone
You can find an `ai-widget.min.js` file in this repository inside the dist folder, which is a standalone build that you can use as follows:

```html
<script src="/path/to/ai-widget.min.js"></script>
```
Additionally inside the body you must add the following div with the options you require:

```html
<div class="ai-widget"
    data-websocket-url="https://192.168.100.87"
    data-emoji="complete"
    data-height="600"
    data-width="350"
    ... >
</div>
```


## Notes
1. Require: `session_persistence: true`
2. It is not convenient to use the complete set of emojis because the necessary training data is increased in a complex way for each emoji.