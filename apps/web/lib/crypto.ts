import { generateSecretKey, getPublicKey } from 'nostr-tools/pure';
import { bytesToHex } from '@noble/hashes/utils';

export function generateHash() {
  // Generate hash
  let sk = generateSecretKey();
  let pk = getPublicKey(sk);

  return { secret: bytesToHex(sk), hash: pk };
}
