import "@ui5/webcomponents/dist/BusyIndicator";
import "@ui5/webcomponents/dist/Button";
import React, { useEffect, useState } from "react";
import { boot } from "./ui5";

export default function App() {
  const [load, setLoad] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  useEffect(() => {
    if (load) {
      setInProgress(true);
      boot().then((sap) => {
        // CODE COPIED FROM SNIPPIX EXAMPLE

        // define a new (simple) Controller type
        sap.ui.controller("my.own.controller", {
          // implement an event handler in the Controller
          doSomething: function () {
            alert("Hello World!");
          }
        });

        // define a new (simple) View type as an XmlView
        // - using data binding for the Button text
        // - binding a controller method to the Button's "press" event
        // - also mixing in some plain HTML
        // note: typically this would be a standalone file
        var xml =
          '<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns="sap.m"            ' +
          '              controllerName="my.own.controller">                   ' +
          '       <Panel headerText="Hello World">                             ' +
          '          <Button text="{/actionName}" press="doSomething"></Button>' +
          "       </Panel>                                                     " +
          "    </mvc:View>                                                     ";

        /*** THIS IS THE "APPLICATION" CODE ***/

        // create some dummy JSON data
        var data = {
          actionName: "Say Hello"
        };

        // instantiate the View
        var myView = new sap.ui.xmlview({ viewContent: xml });
        console.log(myView);

        // create a Model and assign it to the View
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData(data);
        myView.setModel(oModel);

        // put the View onto the screen
        myView.placeAt("content");

        setInProgress(false);
      });
    }
  }, [load]);
  return (
    <ui5-busyindicator active={inProgress ? true : undefined} size="L" >
      {!load && <ui5-button onClick={() => setLoad(true)}>Load UI5</ui5-button>}
      <div id="content"></div>
    </ui5-busyindicator>
  );
}
