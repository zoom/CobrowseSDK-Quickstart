
const token = new URLSearchParams(document.location.search).get("token");
const settings = {
  allowAgentAnnotation: true,
  allowCustomerAnnotation: true,
  piiMask: {
    maskCssSelectors: ".hide-me",
    maskType: "custom_input",
  },
  multiTabSessionPersistence: {
   enable: true,
   stateCookieKey: 'xyz'    
   },
   remoteAssist:{
        enable: true,
        enableCustomerConsent: true,
        remoteAssistTypes: ['scroll_page'], 
   }
};

ZoomCobrowseSDK.init(settings);


