import { ZoomCobrowseAgentSDK } from '@zoom/cobrowsesdk/agent';

const token = new URLSearchParams(document.location.search).get("token");
const iframe = document.getElementById("cd-iframe");
iframe.src = `https://us01-zcb.zoom.us/sdkapi/zcb/frame-templates/desk?access_token=${token}`;
const btn = document.getElementById("cb-agent-btn");
const el = document.getElementById("cb-root");

const settings = {
    appKey: import.meta.env.VITE_ZOOM_SDK_KEY,
    zoomAppRoot: el,
};

const joinSession = () => {
  ZoomCobrowseAgentSDK.init(settings, function ({ success, sdkInfo, session, error }) {
  console.log({sdkInfo})
  if (success) {
    btn.style.display = 'none';
    session.createAgentViewerEndpoint({
       pinCode:'982734',
       sdkToken: token
    }, function({ success, agentViewerUrl, error }){
       if(success){
         console.log(agentViewerUrl)
       }else {
         console.log(error)
       }
     });
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
