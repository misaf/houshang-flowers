const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const certPath = path.join(__dirname, 'certificates');

// Create certificates directory if it doesn't exist
if (!fs.existsSync(certPath)) {
  fs.mkdirSync(certPath, { recursive: true });
}

console.log('🔐 Generating SSL certificates for localhost...\n');

try {
  // Check if openssl is available
  execSync('which openssl', { stdio: 'ignore' });
  
  // Generate private key
  console.log('📝 Generating private key...');
  execSync(
    `openssl genrsa -out ${path.join(certPath, 'localhost-key.pem')} 2048`,
    { stdio: 'inherit' }
  );

  // Generate certificate signing request
  console.log('📝 Generating certificate signing request...');
  execSync(
    `openssl req -new -key ${path.join(certPath, 'localhost-key.pem')} -out ${path.join(certPath, 'localhost.csr')} -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`,
    { stdio: 'inherit' }
  );

  // Generate self-signed certificate (valid for 365 days)
  console.log('📝 Generating self-signed certificate...');
  execSync(
    `openssl x509 -req -in ${path.join(certPath, 'localhost.csr')} -signkey ${path.join(certPath, 'localhost-key.pem')} -out ${path.join(certPath, 'localhost.pem')} -days 365`,
    { stdio: 'inherit' }
  );

  // Clean up CSR file
  fs.unlinkSync(path.join(certPath, 'localhost.csr'));

  console.log('\n✅ SSL certificates generated successfully!');
  console.log(`📁 Certificates saved to: ${certPath}`);
  console.log('\n⚠️  Note: You may need to accept the self-signed certificate in your browser.');
  console.log('   This is normal for local development.\n');
} catch (error) {
  console.error('\n❌ Error generating certificates:', error.message);
  console.log('\n💡 Alternative: Install mkcert for trusted local certificates:');
  console.log('   brew install mkcert  # macOS');
  console.log('   mkcert -install');
  console.log('   mkcert localhost 127.0.0.1 ::1');
  console.log('   Then move localhost+2.pem to certificates/localhost.pem');
  console.log('   And localhost+2-key.pem to certificates/localhost-key.pem\n');
  process.exit(1);
}

