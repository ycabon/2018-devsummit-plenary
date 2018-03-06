# Esri DevSummit 2018 - Plenary

The following demos were presented at the Esri DevSummit 2018 to demonstrate new client-side capabilities of the [ArcGIS API for JavaScript 4.7](https://js.arcgis.com) (April 2018).

### Construction of New York

The application showcases the construction of the current buildings of New York over time.
The demo features a widget that displays information about the buildings currently built at a given time in in the view extent. The queries required to update the widget are executed client-side, avoiding round trips to the service. It uses web workers, spatial indexing and a SQL engine.

[![New York demo](https://ycabon.github.io/2018-devsummit-plenary/new-york.png)](https://ycabon.github.io/2018-devsummit-plenary/1-new-york.html)

### Hurricanes Explorer

The application is a dynamic map app of a static map made with ArcGIS Pro you can find on Maps We Love http://www.esri.com/products/maps-we-love/hurricane-map
You can explore a hurricanes dataset using the same client-side querying. The longitude and latitude coordinates are projected client side in the view's projection by the projection engine, the same available in ArcGIS Pro and Runtime. It's compiled as a WebAssembly module and streamed to the web browser.

[![Hurricanes demo](https://ycabon.github.io/2018-devsummit-plenary/hurricanes.png)](https://ycabon.github.io/2018-devsummit-plenary/2-hurricanes.html)
