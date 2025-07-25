import { ZoomCobrowseAgentSDK } from '@zoom/cobrowsesdk/agent';

const token = new URLSearchParams(document.location.search).get("token");
const btn = document.getElementById("cb-agent-btn");
const btnContainer = document.getElementById("btn-container");
const cbRoot = document.getElementById("cb-root");

const settings = {
    appKey: import.meta.env.VITE_ZOOM_SDK_KEY,
    zoomAppRoot: cbRoot,
};

const joinSession = () => {
  ZoomCobrowseAgentSDK.init(settings, ({success, session, error}) => {
     if (success) {
      const sessionInfo = session.getSessionInfo();
  
      if (sessionInfo.sessionStatus === 'session_recoverable') {
        session.join();
      } else {
         btnContainer.style.display = 'none';
         cbRoot.style.display = "flex";
         session.join({
            pinCode:'982034',
            sdkToken: token
         });
        }
      } else {
        console.log(error);
      }
   });
};

if (!token) {
  alert("Please provide a valid token");
  window.location.href = "/";
}

btn.addEventListener("click", joinSession);
