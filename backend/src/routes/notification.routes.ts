import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { publishToQueue } from '../queue/producer';
import { getStatusMap } from '../queue/consumer';

const router = Router();

router.post('/', async (req, res) => {
  const { conteudoMensagem } = req.body;
  if (!conteudoMensagem)
    return res.status(400).json({ erro: 'Mensagem vazia' });

  const mensagemId = uuidv4();
  await publishToQueue(mensagemId, conteudoMensagem);

  return res
    .status(202)
    .json({ mensagemId, status: 'AGUARDANDO_PROCESSAMENTO' });
});

router.get('/status/:id', (req, res) => {
  const status = getStatusMap().get(req.params.id);
  if (!status) return res.status(404).json({ erro: 'Mensagem não encontrada' });
  return res.json({ mensagemId: req.params.id, status });
});

export default router;
