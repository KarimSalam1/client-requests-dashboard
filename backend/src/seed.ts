import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDb } from './config/db.js';
import { RequestModel } from './models/Request.js';

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/client-requests';

const samples = [
  {
    title: 'Update billing address on invoices',
    description: 'Client moved offices, invoices still show the old address.',
    status: 'Done',
  },
  {
    title: 'Export monthly usage report',
    description: 'They need a CSV export of usage broken down by team.',
    status: 'In Progress',
  },
  {
    title: 'Add two new users to the workspace',
    description: '',
    status: 'New',
  },
  {
    title: 'Investigate slow dashboard load times',
    description: 'Reported by their ops team, mainly on Monday mornings.',
    status: 'New',
  },
];

async function seed() {
  await connectDb(mongoUri);

  await RequestModel.deleteMany({});
  await RequestModel.create(samples);

  console.log(`Seeded ${samples.length} requests`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
