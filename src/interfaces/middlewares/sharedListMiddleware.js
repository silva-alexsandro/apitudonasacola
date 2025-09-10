import { makeListController } from "../../app/factories/listControllerFactory.js";

export async function sharedListMiddleware(req, res, next) {
  const token = req.params.token;
  const shareRepo = makeListController();

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido.' });
  }

  try {
    const share = await shareRepo.findByToken(token);

    if (!share) {
      return res.status(404).json({ error: 'Compartilhamento não encontrado.' });
    }

    if (share.expiresAt && new Date(share.expiresAt) < new Date()) {
      return res.status(403).json({ error: 'Link de compartilhamento expirado.' });
    }

    req.sharedList = {
      listId: share.list_id,
      permission: share.permission,
      token: share.token,
    };

    next();
  } catch (err) {
    console.error('Erro no middleware de compartilhamento:', err);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
}