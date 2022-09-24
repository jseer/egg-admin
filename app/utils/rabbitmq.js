const amqplib = require('amqplib');

module.exports = async function (app) {
  const config = app.config.rabbitmq;
  const queue = 'apiItemsToRedis';
  const conn = await amqplib.connect('amqp://localhost');
  const channel_p = await conn.createChannel();
  await channel_p.assertQueue(queue, {
    durable: true,
  });
  const channel_c = await conn.createChannel();
  await channel_c.assertQueue(queue, {
    durable: true,
  });
};
