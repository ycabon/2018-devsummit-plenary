const href = location.href;
var appName = href.substring(href.lastIndexOf('/') + 1, href.indexOf(".html"));
var path = href.substring(0, href.lastIndexOf('/'));

var api = `https://js.arcgis.com/4.26/`;
var node_modules = `https://js.arcgis.com/4.26/`;

var loaderConfig = {
  paths: {
    esri: "https://js.arcgis.com/4.26/esri/",
    app: `${path}/src/${appName}`
  },
  baseUrl: `${path}/src/`,
  deps: [`app/application`]
}

window.dojoConfig = loaderConfig;
