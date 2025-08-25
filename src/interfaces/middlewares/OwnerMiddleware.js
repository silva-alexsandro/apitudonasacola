import { validate } from 'uuid';
import { makeOwnerController } from "../../app/factories/ownerControllerFactory.js";


const { createOwnerUseCase, getOwnerByIdUseCase, updateLastActiveUseCase } = makeOwnerController();

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
    if (!owner) {
      req.owner = await createOwnerUseCase.execute();
      return next();
    }
    if (!validate(owner)) {
      return res.status(400).json({ error: 'UUID de owner inválido' });
    }
    const existingOwner = await getOwnerByIdUseCase.execute(owner);
    if (!existingOwner) {
      const created = await createOwnerUseCase.execute();
      req.owner = created.id;
    } else {
      await updateLastActiveUseCase.execute(existingOwner.id);
      req.owner = existingOwner;
    }

    next();
  } catch (err) {
    res.status(500).json({
      error: 'Erro interno no middleware de owner.',
      message: err.message,
    });
  }
}