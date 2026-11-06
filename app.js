const fastify = require('fastify');
const db = require('./db'); 
const app = fastify({
    logger: true 
});

require('./routes')(app, db);

app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    console.log(`Сервер запущен на ${address}`);
});