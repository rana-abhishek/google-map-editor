import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import pubSub from "./pubsub";

const widgetName = "maps-widget";
const widgetConfigName = widgetName + "Config";
const defaultconfig = {
  someDefaultConfiguration: false,
};

let message;

function StarterApp(window) {
  if (!window[widgetName]) {
    let tag = document.getElementById(`${widgetName}-script`);

    if (!tag) {
      throw Error(`Cannot find script tag with id {$widgetName}-Script`);
    }

    let rawData = tag.getAttribute("data-config");
    rawData = rawData.replace(/'/g, '"');
    let data = JSON.parse(rawData);

    window[widgetName] = data.name;

    let placeholder = {};
    (placeholder.q = []).push(["init", data.config]);

    window[window[widgetName]] = placeholder;
  }

  let placeholder = window[window[widgetName]];

  // override temporary (until the app loaded) handler
  // for widget's API calls
  window[window[widgetName]] = ApiHandler;
  window[widgetConfigName] = defaultconfig;

  if (placeholder) {
    let queue = placeholder.q;
    if (queue) {
      for (var i = 0; i < queue.length; i++) {
        ApiHandler(queue[i][0], queue[i][1]);
      }
    }
  }
}

/**
    Method that handles all API calls
*/
function ApiHandler(api, params) {
  if (!api) throw Error("API method required");
  api = api.toLowerCase();
  let config = window[widgetConfigName];

  switch (api) {
    case "init":
      config = Object.assign({}, config, params);
      window[widgetConfigName] = config;

      // get a reference to the created widget component so we can
      // call methods as needed
      ReactDOM.render(
        <App message={message} />,
        document.getElementById(config.targetElementId)
      );

      pubSub.subscribe("receiveMessagesFromClient", config.subscriberCallback);
      break;
    case "message":
      // Send the message to the current widget instance
      const data = {
        msg: params,
      };

      pubSub.publish("updateMessage", data);
      break;
    default:
      throw Error(`Method ${api} is not supported`);
  }
}

StarterApp(window);

export default StarterApp;
