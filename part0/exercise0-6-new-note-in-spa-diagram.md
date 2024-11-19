```
sequenceDiagram
    participant browser
    participant server

    Note right of browser: When Save is clicked, the browser starts executing the JavaScript code to rerender the Notes on screen and send the new note to the server to be saved in an object on the server.

    browser-->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Successful response {"message":"note created"}
    deactivate server
```