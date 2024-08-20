const sdkKey = import.meta.env.VITE_ZOOM_COBROWSE_SDK_KEY;

if (!new URLSearchParams(document.location.search).get("token")) {
  alert("Please provide a valid token");
  window.location.href = "/";
}

(function (r, a, b, f, c, d) {
  r[f] = r[f] || {
    init: function () {
      r.ZoomCobrowseSDKInitArgs = arguments;
    },
  };
  var fragment = a.createDocumentFragment();
  function loadJs(url) {
    c = a.createElement(b);
    d = a.getElementsByTagName(b)[0];
    c.async = false;
    c.src = url;
    fragment.appendChild(c);
  }
  loadJs(`https://dev-zcb.zoomdev.us/static/resource/sdk/${sdkKey}/js`);
  d.parentNode.insertBefore(fragment, d);
})(window, document, "script", "ZoomCobrowseSDK");

// start session
const settings = {};

ZoomCobrowseSDK.init(settings, function ({ success, session, error }) {
  console.log(session, success, error);
  if (success) {
    // ZoomCobrowseSDK is ready to use now
    console.log("success");
    session.start({
      sdkToken: new URLSearchParams(document.location.search).get("token"),
    });
  } else {
    console.log(error);
  }
});
