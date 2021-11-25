const server  =  require('./src');

const port = process.env.PORT || 8081;

server.listen(port, () => {
	console.log(`⚡️ server started in ${port} `);
});