const selfsigned = require('selfsigned');
const fs = require('fs');

const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365, keySize: 2048 });

fs.writeFileSync('server.key', pems.private);
fs.writeFileSync('server.cert', pems.cert);

console.log('✅ Certificados SSL gerados com sucesso!');
console.log('   server.key e server.cert criados.');
console.log('   Agora você pode iniciar o servidor com HTTPS.');
