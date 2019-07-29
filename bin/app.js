const http = require('http');
const mongoose = require('lib/mongoose');
const init = require('lib/express');

const start = () => {
    const appStartMessage = () => {
        const env = process.env.NODE_ENV;
        console.log(`API is Initialized`);
        console.log(`App Name : DocsApp`);
        console.log(`Environment  : ${env || 'development'}`);
        console.log(`App Port : 3000`);
        console.log(`Process Id : ${process.pid}`);
      };

    const app = init.init();

    mongoose.connect(() => {
    	let server = http.createServer(app).listen(process.env.PORT || 3000, appStartMessage);
        server.listen(process.env.PORT || 3000, appStartMessage);
    })
}

module.exports = {
    start: start
};
