/* global importScripts, zhConfig */
importScripts('./built/config.js');

const {
  isEnterprise,
  githubURL,
  ZENHUB_WEBSITE_ADDRESS: zenhubWebsiteAddress,
} = zhConfig;

const THANK_YOU_URL_WITH_REDIRECT = isEnterprise
  ? null
  : `${zenhubWebsiteAddress}/thank-you?redirect=${encodeURIComponent(githubURL)}`;

// Redirect user to thank-you page after they install the extension.
const redirectToThankyouPage = () => {
  let storage;

  if (chrome && chrome.storage.sync) {
    storage = chrome.storage.sync;

    // Firefox does not support storage.sync yet
  } else {
    storage = browser.storage.local;
  }

  storage.get(null, (cacheParam) => {
    const cache = cacheParam || {};
    // If the thankYouURL is not set (enterprise) and there is no api token, go
    // through the signup process
    if (THANK_YOU_URL_WITH_REDIRECT && !cache.api_token) {
      chrome.tabs.create({
        url: THANK_YOU_URL_WITH_REDIRECT,
      });
    }
  });
};

// Array of ports (see https://developer.chrome.com/extensions/messaging#connect)
// that have subscribed for notifications when the extension has been authenticated
// via an OAuth redirect
let oAuthListenerPorts = [];

const backgroundRunner = {
  url(data) {
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      (tabArr) =>
        chrome.tabs.create({
          url: data,
          index: tabArr[0].index + 1,
        })
    );
  },

  openWindow({ url, type, dimensions = [800, 600], location = [0, 0] }) {
    const [width, height] = dimensions;
    const [top, left] = location;

    chrome.windows.create({
      url,
      type: type || 'normal',
      width,
      height,
      top,
      left,
    });
  },

  storageLocal(data, sender, sendResponse) {
    if (data.action === 'set') {
      browser.storage.local.set(data.tokens, sendResponse);
    } else if (data.action === 'get') {
      browser.storage.local.get(data.tokens, sendResponse);
    } else if (data.action === 'remove') {
      browser.storage.local.remove(data.tokens, sendResponse);
    } else if (data.action === 'clear') {
      browser.storage.local.clear(sendResponse);
    } else if (data.action === 'onChanged') {
      // Not needed -> Not implemented
    }
  },

  code(data, sender, sendResponse) {
    chrome.scripting.executeScript(null, {
      code: data,
    });
    sendResponse({
      status: 'OK',
    });
  },

  // Close the tab that sent this "close" message
  close(_data, sender, sendResponse) {
    chrome.tabs.remove(sender.tab.id, () =>
      sendResponse({
        status: 'OK',
      })
    );
  },

  commandNotFound(data, sender, sendResponse) {
    sendResponse({
      what: 'Can you say that again?',
    });
  },

  // When the browser window we open for OAuth redirects has authenticated successfully, notify any tabs
  // that are waiting on authentication, so they can refresh themselves
  oauthSuccess(_data, sender) {
    try {
      // Firefox can throw here when logging in from the extension popup, since the popup
      // is closed before it can receive the message
      oAuthListenerPorts.forEach((port) =>
        port.postMessage({ name: 'oauthSuccessFromPort' })
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('oauthSuccessFromPort error:', err);
    }
    oAuthListenerPorts = [];

    // Close the OAuth redirect window
    // Need the `sender?.tab?.id` check because sometimes a `sender` is not passed in Firefox (#18997)
    chrome.tabs.get(sender?.tab?.id, (tab) => {
      // Ensure the tab exists before trying to close it
      if (tab) chrome.tabs.remove(tab.id);
    });
  },

  requestUpdateCheck() {
    // Does not work with firefox
    if (chrome && chrome.runtime.requestUpdateCheck) {
      chrome.runtime.requestUpdateCheck(() => {});
    }
  },

  reloadExtension() {
    // Do nothing - calling reload locks up the extension and anything relying on getManifest()
  },

  tabstatus(data, sender, sendResponse) {
    let selected = false;
    try {
      /*
       * https://developer.chrome.com/extensions/tabs#type-Tab
       */
      selected = sender.tab.active;
    } catch (e) {
      // Do nothing
    }

    sendResponse({
      selected,
    });
  },

  // TODO: Switch up js/main.js to no longer hijack window.fetch with pollyfilled fetch that uses xmlhttprequest; Instead,
  //       have our own fetch polyfill that proxy's requests here. This is for Chrome only as we run into CORS issues and
  //       need to make the requests via the service worker
  executeXMLHttpRequestInBackground: async (data, sender, senderResponse) => {
    const [method, url] = data.open;
    const [body] = data.send; // body of the request
    const requestHeaders = data.setRequestHeader; // Array<{key: string, value: string}>

    const formattedRequestHeaders = requestHeaders?.reduce(
      (acc, { key, value }) => ({
        ...acc,
        [key]: value,
      }),
      {}
    );

    const response = await fetch(url, {
      method,
      headers: formattedRequestHeaders,
      body,
    });
    const contentType = response.headers.get('content-type');

    let responseHeaders = '';
    for (const [key, value] of response.headers.entries()) {
      responseHeaders += `${key}: ${value}\n`;
    }

    const formattedResponse = {
      readyState: 4,
      responseText: contentType.includes('application/json')
        ? JSON.stringify(await response.json())
        : await response.text(),
      status: response.status,
      statusText: response.statusText,
      responseHeaders,
    };
    senderResponse(formattedResponse);
  },
};

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  const command = backgroundRunner[req.command] || backgroundRunner.commandNotFound;
  command(req.data, sender, sendResponse);
  return true;
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'waitForOAuth') oAuthListenerPorts.push(port);
});

// Won't work before Firefox 52
if (chrome && chrome.runtime.onInstalled) {
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      redirectToThankyouPage();
    }
  });
}
