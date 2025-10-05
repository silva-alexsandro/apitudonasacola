import { validate } from 'uuid';
import { makeOwnerController } from '../../app/factories/ownerControllerFactory.js';

function getOwnerFromHeaders(req) {
 const headerValue = req.headers['owner-id'] || req.headers['authorization'];

 if (!headerValue || headerValue === 'undefined') return null;
 const trimmed = headerValue.trim();
 if (/^Bearer\s+/i.test(trimmed)) {
  return trimmed.replace(/^Bearer\s+/i, '').trim();
 }
 return trimmed;
}

async function fetchOrCreateOwner(req) {
 const ownerController = makeOwnerController();
 const ownerId = getOwnerFromHeaders(req);

 if (!ownerId || !validate(ownerId)) {
  return await ownerController.createOwner();
 }
 const existingOwner = await ownerController.findById(ownerId);
 if (!existingOwner) {
  return await ownerController.createOwner();
 }
 return existingOwner;
}

export async function ownerMiddleware(req, res, next) {
 try {
  req.owner = await fetchOrCreateOwner(req);
  next();
 } catch (err) {
  next(err);
 }
}
async function fetchRequiredOwner(req) {
 const ownerController = makeOwnerController();
 const ownerId = getOwnerFromHeaders(req);
 if (!ownerId) {
  const err = new Error('Owner não informado');
  err.status = 401;
  throw err;
 }

 if (!validate(ownerId)) {
  const err = new Error('Owner inválido');
  err.status = 400;
  throw err;
 }

 const existingOwner = await ownerController.findById(ownerId);
 if (!existingOwner) {
  const err = new Error('Owner não encontrado');
  err.status = 404;
  throw err;
 }

 await ownerController.upLastActive(existingOwner.id);
 return existingOwner;
}

export async function requireOwnerId(req, res, next) {
 try {
  req.owner = await fetchRequiredOwner(req);
  next();
 } catch (err) {
  //   res.status(err.status || 500).json({
  //    error: err.message || 'Erro interno no middleware de owner.',
  //   });

  const statusCode = err.status || 500;
  const message = err.message || 'Erro interno no middleware de owner.';

  res.status(statusCode).json({
   error: message,
  });
 }
}
