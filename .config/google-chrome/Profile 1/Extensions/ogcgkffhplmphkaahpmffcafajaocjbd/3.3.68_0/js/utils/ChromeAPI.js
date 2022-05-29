/* eslint-disable no-console */

function swallowStorageSyncErr(err) {
  if (err && err.message && err.message.indexOf('Invocation of form') === 0) {
    console.error('Swallow Chrome Storage Sync Error: ', err);
  } else {
    throw err;
  }
}

/* eslint strict: 0 */
// eslint-disable-next-line func-names
(function (window) {
  /**
   *  Methods that use the browser storage api
   */
  const Storage = {
    sync: {
      set(tokens, cb) {
        try {
          return chrome.storage.sync.set(tokens, cb);
        } catch (err) {
          swallowStorageSyncErr(err);
        }
        return null;
      },

      get(tokens, cb) {
        try {
          return chrome.storage.sync.get(tokens, cb);
        } catch (err) {
          swallowStorageSyncErr(err);
        }
        return null;
      },

      remove(tokens, cb) {
        try {
          return chrome.storage.sync.remove(tokens, cb);
        } catch (err) {
          swallowStorageSyncErr(err);
        }
        return null;
      },
    },

    session: {
      set(token, value) {
        return sessionStorage.setItem(token, value);
      },

      get(token) {
        return sessionStorage.getItem(token);
      },

      remove(token) {
        return sessionStorage.removeItem(token);
      },
    },

    /*
     * Example: listen to credential change
     * BrowserAPI.onAnyKeyChanged([
     *  Authentication.ZENHUB_TOKEN_KEY,
     *  Authentication.GITHUB_TOKEN_KEY],
     *  function(newKeyValues) {
     *    console.log(
     *      newKeyValues[
     *        Authentication.ZENHUB_TOKEN_KEY
     *      ]
     *    ); // > 9482jdkfe..f3f
     *    console.log(
     *      newKeyValues[
     *        Authentication.GITHUB_TOKEN_KEY
     *      ]
     *    ); // > f92j39cj3..fi2
     * });
     */
    onKeysChanged(keys, cb) {
      chrome.storage.onChanged.addListener((changes) => {
        for (let i = 0, l = keys.length; i < l; i += 1) {
          const key = keys[i];
          if (!changes[key]) {
            return;
          }
        }

        cb();
      });
    },
  };

  function version() {
    // Runtime might not be set if we're inside a content script.
    const manifest = chrome.runtime ? chrome.runtime.getManifest() : null;

    // If manifest is fetched once extension is updated, it will be undefined. Add a null check
    if (manifest) {
      return manifest.version;
    }

    // Else, manifest is not defined - could happen due to a force update
    return '0.0.0';
  }

  /**
   *  Method that allows to get info from the Extension
   *  As well as interact with browser core features (open/close tabs)
   */
  const Extension = {
    id() {
      return chrome.runtime.id;
    },

    openWindowWithURL({ url, type, dimensions = [800, 600] }) {
      const [width, height] = dimensions;

      // Open a new window in the center of the screen
      // Note: Math.ceil() is necessary because Chrome errors if the coords are not integers
      const top = Math.ceil(window.screen.height / 2 - height / 2);
      const left = Math.ceil(window.screen.width / 2 - width / 2);
      const location = [top, left];

      return chrome.runtime.sendMessage({
        command: 'openWindow',
        data: { url, type, dimensions, location },
      });
    },

    closeTab() {
      Extension.sendMessage({
        command: 'close',
        close: true,
      });
    },

    waitForOAuthLogin(callback) {
      const port = chrome.runtime.connect({ name: 'waitForOAuth' });

      // Wait for oauth login success in a popup window before invoking the callback.
      // Since we never clean up this listener, it could in theory cause a memory leak. However as
      // of this writing we always refresh the page in the callback so there's no leak in practice
      port.onMessage.addListener((msg) => {
        if (msg.name === 'oauthSuccessFromPort') callback();
      });
    },

    /**
     *  Example:
     *  // get the root path of extension folder
     *  BrowserAPI.getURL('')
     *    // chrome-extension://ppdobpmohfolfcelfkfocbgjeimpmeip/
     *
     *  // To display the image path in extension folder
     *  BrowserAPI.getURL('') +
     *   'img/icon38.png'
     *   // chrome-extension://ppdobpmohfolfcelfkfocbgjeimpmeip/img/icon38.png
     */
    getURL(url, cb) {
      if (cb) {
        cb(chrome.runtime.getURL(url));
      }
      return chrome.runtime.getURL(url);
    },

    // Register  callback to Browser's runtime message. When a command with
    // message is received, callback is called.
    // callback must be of type:
    // function(
    //  message,
    //  sender,
    //  function sendResponse() {...}
    // )
    addMessageListener(callback) {
      chrome.runtime.onMessage.addListener(callback);
    },

    /**
     * Send message should follow the format below:
     *    BrowserAPI.sendMessage({
     *      command: 'commandname',
     *      data: data
     *    });
     */
    sendMessage(message, callback) {
      try {
        chrome.runtime.sendMessage(message, (data) => {
          if (callback) {
            callback(data);
          }
        });
      } catch (e) {
        // You will get an exeption say can't read name of undefined,
        // it's because the extension gets reloaded.
        console.error(e.message);
      }
    },

    // Send a reload extension call
    reloadExtension() {
      Extension.sendMessage({ command: 'reloadExtension' });
    },

    isTabOpen(callback) {
      Extension.sendMessage({ command: 'tabstatus' }, (resp) => {
        callback(Boolean(resp.selected));
      });
    },
  };

  const ChromeAPI = {
    support: 'extension',
    browser: 'chrome',
    Storage,
    Extension,
    fallbackUploaderToGh: true,
    version,
  };

  window.BrowserAPI = ChromeAPI; // eslint-disable-line no-param-reassign
})(window);
