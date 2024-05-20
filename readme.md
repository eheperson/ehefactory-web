# ehefactory web page

```bash
cd vite-project
npm install
npm run dev
```

```bash
npx json-server --watch data/db.json --port 8000
```

because we have 'blogs' in the db.json file, we can access it by http://localhost:8000/blogs
and here are the routes we can access:
``` bash
GET     http://localhost:8000/blogs         : fetch all blogs
GET     http://localhost:8000/blogs/{id}    : fetch a blog by id
POST    http://localhost:8000/blogs         : create a new blog
DELETE  http://localhost:8000/blogs/{id}    : delete a blog by id
PUT     http://localhost:8000/blogs/{id}    : update a blog by id
```