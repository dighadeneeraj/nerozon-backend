jest.setTimeout(30000);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

beforeAll(async () => {
  // Pin a MongoDB version known to be stable in your environment if you hit binary issues
  mongod = await MongoMemoryServer.create(/* { binary: { version: '7.0.14' } } */);
  const uri = mongod.getUri();

  await mongoose.connect(uri, { dbName: 'jest' });
  // Ensure indexes exist (unique email, etc.)
  await Promise.all(
    Object.values(mongoose.models).map((model) => model.syncIndexes && model.syncIndexes())
  );
});

afterEach(async () => {
  const { connections } = mongoose;
  for (const conn of connections) {
    const collections = await conn.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});

// afterAll(async () => {
//   await mongoose.disconnect();
//   if (mongod) await mongod.stop();
// });


afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Clear test DB
  //await mongoose.connection.close();        // Close connection
  if (mongod) await mongod.stop();           // Stop in-memory server
});
