import { KJUR } from 'jsrsasign'

const cbBtn = document.getElementById('cb-btn')!;
const iframeBtn = document.getElementById('iframe-btn')!;

cbBtn.addEventListener('click', () => {
  const token = generateSignature(1);
  window.location.href = `cobrowse.html?token=${token}`;
});

iframeBtn.addEventListener('click', () => {
  const token = generateSignature(2);
  window.location.href = `iframe.html?token=${token}`;
});

function generateSignature(role: 1 | 2) {
  const sdkKey = import.meta.env.VITE_ZOOM_COBROWSE_SDK_KEY;
  const sdkSecret = import.meta.env.VITE_ZOOM_COBROWSE_SDK_SECRET;
  if (!sdkKey || !sdkSecret) {
    alert('Please provide a valid sdk key and secret');
    return '';
  }
  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }
  const user_id = Math.random().toString(36).substring(2);
  const oPayload = {
    user_id: user_id,
    app_key: sdkKey,
    role_type: role,
    iat: iat,
    exp: exp
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const cobrowseJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
  console.log(sdkKey);
  console.log(sdkSecret);
  console.log(user_id);
  console.log(cobrowseJWT);
  return cobrowseJWT
}