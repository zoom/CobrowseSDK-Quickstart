import { KJUR } from 'jsrsasign'
// https://www.npmjs.com/package/jsrsasign

function generateSignature() {
  const sdkKey = import.meta.env.VITE_ZOOM_COBROWSE_SDK_KEY;
  const sdkSecret = import.meta.env.VITE_ZOOM_COBROWSE_SDK_SECRET;
  if (!sdkKey || !sdkSecret) {
    alert('Please provide a valid sdk key and secret');
    return '';
  }
  const iat = Math.round(new Date().getTime() / 1000) - 30
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    user_id: "user2_agent",
    app_key: sdkKey,
    role_type: 2,
    iat: iat,
    exp: exp
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const cobrowseJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
  console.log(cobrowseJWT);
  console.log(sdkKey, sdkSecret);
  return cobrowseJWT
}

(document.getElementById('token')! as HTMLInputElement).value = generateSignature();

