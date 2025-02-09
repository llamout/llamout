import { generateSecretKey, getPublicKey } from 'nostr-tools/pure';

export function generateHash() {
  // Generate hash
  let sk = generateSecretKey();
  let pk = getPublicKey(sk);

  return pk;
}
