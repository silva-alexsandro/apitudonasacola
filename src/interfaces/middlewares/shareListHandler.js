import { makeListShareController } from '../../app/factories/listShareControllerFactory.js';

export async function sharedListMiddleware(req, res, next) {
 const { token } = req.params;
 if (!token) {
  return res.status(400).json({ error: 'Token não fornecido.' });
 }

 try {
  const sharedController = makeListShareController();
  const share = await sharedController.findByToken(token);

  if (!share) {
   return res.status(404).json({ error: 'Compartilhamento não encontrado.' });
  }
  const isExpired = share.expiresAt && new Date(share.expiresAt) < new Date();
  if (isExpired) {
   return res.status(403).json({ error: 'Link de compartilhamento expirado.' });
  }
  req.sharedList = {
   listId: share.list_id,
   permission: share.permission,
   token: share.token,
  };
  next();
 } catch (error) {
  console.error('Erro no middleware de compartilhamento:', error);
  return res.status(500).json({ error: 'Erro interno no servidor.' });
 }
}

export function editPermissionMiddleware(req, res, next) {
 if (!req.sharedList) {
  return res
   .status(403)
   .json({ error: 'Acesso negado. Lista não compartilhada.' });
 }

 const { permission } = req.sharedList;

 if (permission !== 'edit') {
  return res.status(403).json({ error: 'Permissão de edição negada.' });
 }

 next();
}
