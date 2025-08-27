import { validate } from 'uuid';
import { makeOwnerController } from "../../app/factories/ownerControllerFactory.js";

function getOwnerFromHeaders(req) {
  const headerValue =
    req.headers['Owner-ID'] ||
    req.headers['owner-id'] ||
    req.headers['Authorization'] ||
    req.headers['authorization'];

  if (!headerValue) return null;
  const trimmed = headerValue.trim();
  if (/^Bearer\s+/i.test(trimmed)) {
    return trimmed.replace(/^Bearer\s+/i, '').trim();
  }
  return trimmed;
}

export async function ownerMiddleware(req, res, next) {
  try {
    let owner = getOwnerFromHeaders(req);
    const ownerController = makeOwnerController();
    if (!owner) {
      req.owner;
      return next();
    }
    if (!validate(owner)) { return res.status(400).json({ error: 'Owner inválido' }); }

    const existingOwner = await ownerController.findById(owner);
    if (!existingOwner) {
      const created = await ownerController.createOwner();
      req.owner = created;
      return next();
    }
    req.owner = existingOwner;
    next();
  } catch (err) {
    res.status(500).json({
      error: 'Erro interno no middleware de owner.',
      message: err.message,
    });
  }
}