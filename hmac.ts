const te = new TextEncoder();
function b64url(buf: ArrayBuffer | Uint8Array){
  const b = Buffer.from(buf as any).toString('base64').replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
  return b;
}
async function hmac(key: string, data: string){
  const cryptoKey = await crypto.subtle.importKey('raw', te.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign','verify']);
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, te.encode(data));
  return new Uint8Array(sig);
}

export async function signToken(payload: Record<string, any>, secret: string){
  const header = { alg: 'HS256', typ: 'JWT' };
  const enc = (obj:any) => b64url(Buffer.from(JSON.stringify(obj)));
  const h = enc(header);
  const p = enc(payload);
  const data = h + '.' + p;
  const sig = await hmac(secret, data);
  const s = b64url(sig);
  return data + '.' + s;
}

export async function verifyToken(token: string, secret: string){
  try{
    const parts = token.split('.'); if(parts.length !== 3) return false;
    const [h,p,sig] = parts;
    const data = h + '.' + p;
    const expected = await hmac(secret, data);
    const actual = Buffer.from(sig.replace(/-/g,'+').replace(/_/g,'/'), 'base64');
    if(expected.length != actual.length) return false;
    let ok = true; for(let i=0;i<expected.length;i++){ ok = ok && (expected[i] === actual[i]); }
    if (!ok) return false;
    const payload = JSON.parse(Buffer.from(p, 'base64').toString('utf8'));
    if(payload.exp && Date.now()/1000 > payload.exp) return false;
    return true;
  }catch{ return false; }
}
