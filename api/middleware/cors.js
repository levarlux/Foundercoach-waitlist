const cors = (req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://foundercoach.xyz',
    'https://www.foundercoach.xyz',
    /\.vercel\.app$/
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.some(allowed => {
    if (typeof allowed === 'string') {
      return origin === allowed;
    }
    return allowed.test(origin);
  })) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

export default cors;
