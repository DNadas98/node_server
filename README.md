# My minimal Node.js server
https://github.com/DNadas98/node_server
- The server serves only existing static files from the views or public folder
- Only GET requests are handled
- Ideal for simple frontend projects

## Install & run

- npm i
- run from the root directory
- node backend/server.js or npm run dev

## File structure

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
  - views
    - subdir

## Default port
- The default port is 3000, to change it, search for PORT in backend/server.js

## Filtering
- By default all queries are removed from the request url
- The request body is cleared (`req.body={}`)
- The cookies are removed from the request header
- To remove or modify these, see backend/server.js

## Frontend references

- HTML files: path relative to root/frontend/views
- Other static files: path relative to root/frontend/public
- For example `<link rel="stylesheet" href="/css/myStyle.css">` will point to root/frontend/public/css/myStyle.css
