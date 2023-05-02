# My minimal Node.js server

https://github.com/DNadas98/node_server

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

## Query filtering
- By default all queries are removed from the request url.
- To remove this, comment out the following line in backend/server.js:
  ```js
  filteredUrl = req.url.replace(`?${queryString}`, '');
  ```

## Frontend references

- HTML files: path relative to root/frontend/views
- Other static files: path relative to root/frontend/public
- For example `<link rel="stylesheet" href="/css/myStyle.css">` will point to root/frontend/public/css/myStyle.css
