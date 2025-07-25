import { ZoomCobrowseSDK } from '@zoom/cobrowsesdk/customer';
// import { fetchToken } from './token';

const serverUrl = import.meta.env.VITE_TOKEN_URL;

export async function fetchToken(role) {
  console.log("made it here")
  const token = (
    await (
      await fetch(serverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: role }),
      }).catch((e) => {
        console.error(e);
        alert("Please provide a valid token url");
      })
    ).json()
  ).token;
  return token;
}

const token = await fetchToken(1);

const settings = {
  appKey: import.meta.env.VITE_ZOOM_SDK_KEY,
  allowAgentAnnotation: true,
  allowCustomerAnnotation: true,
  piiMask: {
    maskCssSelectors: ".hide-me",
    maskType: "custom_input",
  },
  allowSessionContinuation: {
        enable: true,
        stateCookieKey: 'sessionPersistenceCookie',
  },
  remoteAssist:{ 
    enable: true,
    enableCustomerConsent: true,
    remoteAssistTypes: ['scroll_page'], 
  }
};


  ZoomCobrowseSDK.init(settings, ({success, session, error}) => {
  if (success) {
       const sessionInfo = session.getSessionInfo();
       if (sessionInfo.sessionStatus === 'session_recoverable'){        
         session.join();      
       } else {
         session.join();       
      }
     } else {
       console.log("ERROR", error);
     }   
  });


