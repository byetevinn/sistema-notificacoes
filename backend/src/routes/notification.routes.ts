import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { publishToQueue } from '../queue/producer';
import { getStatusMap } from '../queue/consumer';
import { STATUS } from '../constants/status.constants';

const router = Router();

router.post('/', async (req, res) => {
  const { contentMessage } = req.body;
  if (!contentMessage) return res.status(400).json({ erro: 'Mensagem vazia' });

  const messageId = uuidv4();
  await publishToQueue(messageId, contentMessage);

  return res.status(202).json({
    messageId,
    status: STATUS.WAITING,
  });
});

router.get('/status/:id', (req, res) => {
  const status = getStatusMap().get(req.params.id);
  if (!status) return res.status(404).json({ erro: 'Mensagem não encontrada' });
  return res.json({ messageId: req.params.id, status });
});

export default router;
