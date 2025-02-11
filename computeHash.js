const crypto = require("crypto");

function computeScriptHash(script) {
  const hash = crypto.createHash("sha256").update(script).digest("base64");
  return `sha256-${hash}`;
}

module.exports = computeScriptHash;
