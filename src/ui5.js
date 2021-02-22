let bootPromise;
export function boot() {
  if (bootPromise) {
    return bootPromise;
  }
  return (bootPromise = new Promise((resolve, reject) => {
    window["sap-ui-config"] = {
      onInit: () => resolve(window.sap)
    };
    const bootstrap = Object.assign(document.createElement("script"), {
      id: "sap-ui-bootstrap",
      src: "https://sapui5.hana.ondemand.com/resources/sap-ui-core.js",
      "data-sap-ui-theme": "sap_fiori_3",
      "data-sap-ui-libs": "sap.m",
      "data-sap-ui-compatVersion": "edge"
    });
    bootstrap.addEventListener("error", reject);
    document.querySelector("head").append(bootstrap);
  }));
}
export async function require() {
  const args = arguments;
  return boot().then(
    (sap) =>
      new Promise((resolve, reject) => {
        sap.ui.require(
          args,
          (...output) => {
            if (output.length === 1) resolve(output[0]);
            else resolve(output);
          },
          reject
        );
      })
  );
}
