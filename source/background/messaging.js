import { backendMessageReceived } from "./background-script";
import browser from "webextension-polyfill";

/** Initializes background for message passing between foreground and background
 * @see https://developer.chrome.com/extensions/messaging
 * @see backendMessageReceived */
export function initBackendMessaging() {
  browser.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(message =>
      backendMessageReceived(message, port)
    );
  });
}
