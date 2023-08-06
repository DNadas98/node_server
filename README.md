# My minimal Node.js server
This project was my preparation for the web module after I have finished the programming basics module of my coding bootcamp. The simple no-framework server allowed me to learn the basic concepts and implement their logic with the least possible amount of abstraction in this environment.
- The server serves only existing static files from the views or public folder
- Only GET requests are handled
- Ideal for simple frontend projects

## Install & run

- npm i
- run from the root directory
- node backend/server.js or npm run dev

## Folder structure

- backend
  - server.js
  - logs
  - middleware
- frontend
  - public
    - css
    - data
    - img
    - js
    - video
  - views

## Default port
- The default port is 3000, to change it, search for PORT in backend/server.js

## Request filtering
- By default all queries are removed from the request url
- The request body is cleared
- Cookie and other unneeded headers are deleted from the request header
- To remove or modify these, see backend/server.js

## Frontend references

- HTML files: path relative to root/frontend/views
- Other static files: path relative to root/frontend/public
- For example `<link rel="stylesheet" href="/css/myStyle.css">` will point to root/frontend/public/css/myStyle.css
