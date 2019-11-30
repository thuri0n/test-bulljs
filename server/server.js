const server = require('http').createServer();
const io = require('socket.io')(server);
const Queue = require('bull');

const timer = (id) => {
  return new Promise(resolve => {
    const min = 50;
    const max = 1000;
    const random = Math.floor(Math.random() * (+max - +min)) + +min;
    setTimeout(() => {
      return resolve(console.log(`process middle job.id => ${id}, await - ${random} ms`));
    }, random);
  })
};

io.on('connection', client => {
  const queue = new Queue(`queue`, {
    redis: {
      port: 6379,
      host: 'localhost',
      password: 'foobared',
    }
  });

  queue.process(async job => {
    console.log(`process start job.id =>`, job.id);

    await timer(job.id);
    await timer(job.id);

    console.log(`process end job.id =>`, job.id);

    return job.data;
  });

  queue.on('completed', job => {
    console.log(`completed job.id => ${job.id}`);
  });

  client.on('request', async request => {
    console.log(`queue.add  request.id => ${request.id}`);

    return await queue.add(request, {
      removeOnComplete: true,
    });
  });
});

server.listen(3011);
