import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import pubSub from "./pubsub";

const widgetName = "maps-widget";
const widgetConfigName = widgetName + "Config";
const defaultconfig = {
  someDefaultConfiguration: false,
};
let widgetComponent = null;

const widgetDiv = document.getElementById("maps-widget");

function app(window) {
  console.log(`${widgetName} starting`);
  // If we don't already have a name for widget's global object
  // assigned by the host, then they must be using the simple <script> tag method
  // so we need to get our data out of that tag
  if (!window[widgetName]) {
    console.log(widgetName, "-script");
    let tag = document.getElementById(`${widgetName}-script`);

    if (!tag) {
      throw Error(`Cannot find script tag with id {$widgetName}-Script`);
    }

    let rawData = tag.getAttribute("data-config");
    rawData = rawData.replace(/'/g, '"');
    let data = JSON.parse(rawData);
    console.log(data);

    window[widgetName] = data.name;

    let placeholder = {};
    (placeholder.q = []).push(["init", data.config]);

    window[window[widgetName]] = placeholder;
    console.log(window[widgetName]);
  }

  let placeholder = window[window[widgetName]];

  // override temporary (until the app loaded) handler
  // for widget's API calls
  window[window[widgetName]] = apiHandler;
  window[widgetConfigName] = defaultconfig;
  window["onMessageReceived"] = sendMessageToHostHandler;
  console.log(window["onMessageReceived"]);

  if (placeholder) {
    console.log(`${widgetName} placeholder found`);

    let queue = placeholder.q;
    if (queue) {
      console.log(`${widgetName} placeholder queue found`);

      for (var i = 0; i < queue.length; i++) {
        apiHandler(queue[i][0], queue[i][1]);
      }
    }
  }
}

function sendMessageToHostHandler(message = "Default message") {
  console.log("Type: Message", "Content: ", message);
}

/**
    Method that handles all API calls
*/
function apiHandler(api, params) {
  if (!api) throw Error("API method required");
  api = api.toLowerCase();
  let config = window[widgetConfigName];

  console.log(`Handling API call ${api}`, params, config);

  switch (api) {
    case "init":
      config = Object.assign({}, config, params);
      window[widgetConfigName] = config;

      // get a reference to the created widget component so we can
      // call methods as needed
      ReactDOM.render(
        <App
          message={"Default message"}
          sendMessageToHost={sendMessageToHostHandler}
        />,
        document.getElementById(config.targetElementId)
      );
      break;
    case "message":
      // Send the message to the current widget instance
      console.log("Triggered events");

      const data = {
        msg: "TOP SECRET DATA",
      };

      pubSub.publish("anEvent", data);
      // widgetComponent.current.setMessage(params);
      break;
    case "getstatus":
      // Send the message to the current widget instance
      console.log("Triggered events");
      pubSub.subscribe("anEvent", (data) => {
        console.log(`"anEvent", was published with this data: "${data.msg}"`);
      });
      // widgetComponent.current.setMessage(params);
      break;
    default:
      throw Error(`Method ${api} is not supported`);
  }
}

app(window);

export default app;
