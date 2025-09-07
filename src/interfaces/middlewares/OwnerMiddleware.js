import { validate } from 'uuid';
import { makeOwnerController } from "../../app/factories/ownerControllerFactory.js";

function getOwnerFromHeaders(req) {
  const headerValue =
    req.headers['owner-id'] ||
    req.headers['authorization'];

  if (!headerValue || headerValue === 'undefined') return null;

  const trimmed = headerValue.trim();

  if (/^Bearer\s+/i.test(trimmed)) {
    return trimmed.replace(/^Bearer\s+/i, '').trim();
  }

  return trimmed;
}

export async function ownerMiddleware(req, res, next) {
  try {
    let owner = getOwnerFromHeaders(req);
    let hasOwner = null;
    const ownerController = makeOwnerController();

    if (owner) {
      if (!validate(owner)) { return res.status(400).json({ error: 'Owner ID inválido' }); }
      hasOwner = await ownerController.findById(owner);
    }
    if (!hasOwner) {
      const created = await ownerController.createOwner();
      req.owner = created;

      return next();
    }

    req.owner = hasOwner;
    await ownerController.upLastActive(hasOwner.id);

    next();
  } catch (err) {
    res.status(500).json({
      error: 'Erro interno no middleware de owner.',
      message: err.message,
    });
  }
}