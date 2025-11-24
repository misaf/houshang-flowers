const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

// For local development with self-signed certificates (like Laravel Valet),
// disable SSL certificate verification
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  console.log('⚠️  SSL certificate verification disabled for local development');
}

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;
const httpsPort = process.env.HTTPS_PORT || 3443;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Paths to SSL certificates
const certPath = path.join(__dirname, 'certificates');
const keyPath = path.join(certPath, 'localhost-key.pem');
const certFilePath = path.join(certPath, 'localhost.pem');

// Check if certificates exist
const certExists = fs.existsSync(keyPath) && fs.existsSync(certFilePath);

if (!certExists) {
  console.error('\n❌ SSL certificates not found!');
  console.error('📝 To generate certificates, run: npm run generate-cert');
  console.error('   Or use mkcert: https://github.com/FiloSottile/mkcert\n');
  console.error('💡 For HTTP development, use: npm run dev\n');
  process.exit(1);
} else {
  // Read SSL certificates
  const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certFilePath),
  };

  app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(httpsPort, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://${hostname}:${httpsPort}`);
      console.log(`> Note: You may need to accept the self-signed certificate in your browser`);
    });
  });
}

