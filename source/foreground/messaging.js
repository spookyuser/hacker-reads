import { frontendMessageReceived } from "./content-script";
import browser from "webextension-polyfill";

/** Initializes foreground for message passing between foreground and background
 * @see https://developer.chrome.com/extensions/messaging
 * @see backendMessageReceived */
export function initFrontendMessaging() {
  const port = browser.runtime.connect({ name: "hn-reads-port" });
  port.onMessage.addListener(frontendMessageReceived);
  return port;
}
