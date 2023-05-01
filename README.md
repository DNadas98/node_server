# My minimal Node.js server

https://github.com/DNadas98/node_server

## Install & run

- run from the root directory
- npm i
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

## Frontend references

- HTML files: path relative to root/frontend/views
- Other static files: path relative to root/frontend/public
- For example `<link rel="stylesheet" href="/css/myStyle.css">` will point to root/frontend/public/css/myStyle.css
