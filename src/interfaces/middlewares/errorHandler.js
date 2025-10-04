export function errorHandler(err, req, res, next) {
 console.error(err.stack);

 if (err.message && err.message.includes('CORS')) {
  return res.status(403).json({
   error: 'Acesso negado pelo CORS.',
   message: err.message,
  });
 }

 res.status(500).json({
  error: 'Ocorreu um erro inesperado.',
  message: err.message,
 });
}
