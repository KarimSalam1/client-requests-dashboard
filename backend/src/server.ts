import 'dotenv/config';
import { createApp } from './app.js';
import { connectDb } from './config/db.js';

const port = Number(process.env.PORT) || 4000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/client-requests';
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

async function main() {
  await connectDb(mongoUri);

  const app = createApp(clientOrigin);
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
