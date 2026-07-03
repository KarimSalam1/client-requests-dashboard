import { Router } from 'express';
import mongoose from 'mongoose';
import { RequestModel, STATUSES, type Status } from '../models/Request.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const requests = await RequestModel.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body ?? {};

    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const created = await RequestModel.create({ title: title.trim(), description });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body ?? {};

    if (!STATUSES.includes(status as Status)) {
      return res.status(400).json({ error: `Status must be one of: ${STATUSES.join(', ')}` });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ error: 'Request not found' });
    }

    const updated = await RequestModel.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
