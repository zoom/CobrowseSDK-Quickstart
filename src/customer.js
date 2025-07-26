import { ZoomCobrowseSDK } from '@zoom/cobrowsesdk/customer';

const token = new URLSearchParams(document.location.search).get("token");
const btn = document.getElementById("cb-btn");

const settings = {
  appKey: import.meta.env.VITE_ZOOM_SDK_KEY,
  allowAgentAnnotation: true,
  allowCustomerAnnotation: true,
  piiMask: {
    maskCssSelectors: ".hide-me",
    maskType: "custom_input",
  },
};

const startSession = () => {
  ZoomCobrowseSDK.init(settings, ({success, session, error}) => {
  if (success) {
       btn.disabled = true;
       const sessionInfo = session.getSessionInfo();

       if (sessionInfo.sessionStatus === 'session_recoverable'){        
         session.join();      
       } else {
         session.start({
           customPinCode:'982034',
           sdkToken: token,
         });
         
       btn.innerText = "Cobrowse Started";
      }
     } else {
       console.log("ERROR", error);
     }   
  });
};

if (!token) {
  alert("Please provide a valid token");
  window.location.href = "/";
}

if (btn) btn.addEventListener("click", startSession);
