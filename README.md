# express-routes-lister

### Introduction
All of backend developer who are using express, they are facing problem to list all the Api routes with methods in one place. And we can take reference to call at the time of calling the Api routes. So **express-routes-lister** is the solution for this problem that is easy to use.

### How to use it

Just install the package in your project using npm

```
npm i express-routes-lister
```


And after installing you just want to import it into your main/starter file. 
```JavaScript
const { getRoutesList } = require('express-routes-lister');
```

And call the **getRoutesList** function by passing just your app of your express.

After making all the required routes on your main/stater file, you have to call the getRoutesList() function to list all the routes. If your other route also come from other file it will detect that routes also and print it with proper path.

```JavaScript
// Requiring express

const express = require('express');
const { getRoutesList } = require('express-routes-lister');

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
    return res.status(200).send("Home Page");
});

app.get('/service', (req, res) => {
    return res.status(200).send("Service Page");
});

app.post('/signup', (req, res) => {
    return res.status(200).send("SignUp Page");
});

getRoutesList(app);

app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
});

```

Code output:

[![Screenshot-2023-10-09-120723.png](https://i.postimg.cc/wvRhDG1K/Screenshot-2023-10-09-120723.png)](https://postimg.cc/WFjFvSmS)