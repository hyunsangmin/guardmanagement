var resolutions;

var changeresolution = function(evt) {
	setScale(evt.target.get('resolution'));
};


var moveend = function(evt) {
	var extent = map.getView().calculateExtent(map.getSize());
	console.log("moveend")
	console.log(extent[0] + ',' + extent[1] + ',' + extent[2] + ',' + extent[3]);
};

var clickmap = function(evt) {
	$('.contextMenu').hide();
	//var ext = map.getView().calculateExtent(map.getSize());
	//console.log(ext)
	console.log("clickmap")
	console.log(evt)
	console.log(evt.coordinate[0]+"[x]   " +evt.coordinate[1]+"[y]" );
	//map.getView().setCenter([evt.coordinate[0], evt.coordinate[1]])
	
	var formdata = new FormData();
	   	   formdata.append('x', evt.coordinate[0]);
	       formdata.append('y', evt.coordinate[1]);
	       formdata.append('buffer', map.getView().N.resolution*10);
	data = {
		'x':evt.coordinate[0],
		'y':evt.coordinate[1],
		buffer:map.getView().N.resolution*10
	}	
	//sendPostAjax('eventinfo', 'receiveEventInfo', data);
	sendGetAjax('eventinfo', 'receiveEventInfo', data);	
}


var setResolutions = function() {
	var newresolution = [];
	var scaletest = [2100000.0, 1500000.0, 1000000.0, 750000.0, 500000.0, 300000.0, 190000.0, 125000.0, 92500.0, 62500.0, 31250.0, 15625.0, 7812.5, 3906.25, 1953.125, 976.5625, 488.28125, 244.140625,
		122.0703125, 61.03515625, 30.517578125];//,
	var units = 'm';
	var dpi = 25.4 / 0.28;
	var mpu = ol.proj.Units.METERS_PER_UNIT[units];

	for (var i = 0; i < scaletest.length; i++) {
		resolution = scaletest[i] / (mpu * 39.37 * dpi);
		newresolution.push(resolution);
	}
	resolutions = newresolution;
};


var setScale = function(resolution) {
	var units = map.getView().getProjection().getUnits();
	var dpi = 25.4 / 0.28;
	var mpu = ol.proj.Units.METERS_PER_UNIT[units];
	var scale = resolution * mpu * 39.37 * dpi;
};

/////
var removeMarker = function (obj) {
    vectorLayer.getSource().removeFeature(obj.data.marker);
};
var removeMarkerItem = {
    text: 'Remove this Marker',
    icon: 'img/marker.png',
    callback: removeMarker,
};




/*
var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: '//openlayers.org/en/v3.8.2/examples/data/icon.png'
    })
});

*/


function handleContexMenuEvent(option, x, y) {
    $('.contextMenu').remove();
    var location = map.getCoordinateFromPixel([x, y]);

    if (option == 'zoomIn' ) {
        var view = map.getView();
        view.setZoom(view.getZoom() + 1);
    } else if (option == 'zoomOut' ) {
        var view = map.getView();
        view.setZoom(view.getZoom() - 1);
    } else if (option == 'centerMap' ) {
        console.log(location);
        goToCoord(location[0], location[1]);
    } else if (option == 'addMarker') {
        console.log(location);
        var feature = new ol.Feature(
        new ol.geom.Point(location));
        feature.setStyle(iconStyle);
        vectorSource.addFeature(feature);
    } else if (option == 'addArea') {
        var draw; // global so we can remove it later
        geometryFunction = function (coordinates, geometry) {
            if (!geometry) {
                geometry = new ol.geom.Polygon(null);
            }
            
            console.log("geometry : " + geometry)
            console.log("coordinates : " + coordinates)
            var start = coordinates[0];
            var end = coordinates[1];
            console.log("start : " + start)
            console.log("end : " + end)
            geometry.setCoordinates([
                [start, [start[0], end[1]], end, [end[0], start[1]], start]
            ]);

            return geometry;
        };
        draw = new ol.interaction.Draw({
            source: areaSource,
            type: 'Polygon',
            geometryFunction: geometryFunction
        });
        map.addInteraction(draw);

        draw.on('drawend', function (event) {
            map.removeInteraction(draw);
        });
    }
}

function goToCoord(x, y) {
    var p = new ol.geom.Point([x,y]).getCoordinates();
    /*var pan = ol.animation.pan({
        duration: 200,
        source: map.getView().getCenter()
    });

    map.beforeRender(pan);
    map.getView().setCenter(p);*/
    map.getView().setCenter(p)
}
