const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzIyMTQ2YTI5ODIxNDZkMzhmYzgzMTIiLCJpYXQiOjE2NjMzMTMyMDYsImV4cCI6MTY2MzkxODAwNn0.FSwMRwBhNOjPGpokqWsqhpOmsx6Umr-XM3U-JNuQ3OY';
const SECRET_KEY_DEV = 'secret-key';
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}
