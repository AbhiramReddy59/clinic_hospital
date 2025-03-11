// Fix for OpenSSL error in Node.js v20
process.env.NODE_OPTIONS = "--openssl-legacy-provider";
require('react-scripts/scripts/start');
