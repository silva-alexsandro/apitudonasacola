import { makeListController } from "../../app/factories/listControllerFactory.js";

export function shareAuthMiddleware() {
  return async (req, res, next) => {
    try {
      const listShareRepository = makeListController();
      // Pode vir no header ou query string
      const token = req.headers['x-share-token'] || req.query.token;
      if (!token) return res.status(401).json({ error: 'Token de compartilhamento obrigatório.' });

      const share = await listShareRepository.findByToken(token);
      if (!share) return res.status(404).json({ error: 'Compartilhamento não encontrado.' });

      if (share.expiresAt && share.expiresAt < new Date()) {
        return res.status(403).json({ error: 'Compartilhamento expirado.' });
      }

      req.share = share; // Anexa o compartilhamento para usar nas rotas
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  };
}
