var map;
var resolutions;

var changeresolution = function(evt) {
	setScale(evt.target.get('resolution'));
};

var moveend = function(evt) {
	var extent = map.getView().calculateExtent(map.getSize());
	console.log(extent[0] + ',' + extent[1] + ',' + extent[2] + ',' + extent[3]);
	console.log(map.getView().getCenter()[0] + ',' + map.getView().getCenter()[1]);
};

var clickmap = function(evt) {
	//var ext = map.getView().calculateExtent(map.getSize());
	//console.log(ext)
	console.log(evt.coordinate[0]+"[0]   " +evt.coordinate[1]+"[1]" );
	map.getView().setCenter([evt.coordinate[0], evt.coordinate[1]])
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

function init() {

	// 좌표계 설정
	initProj();

	var daumBaseLayer = new ol.layer.Tile({
		source: new ol.source.XYZ({
			projection: new ol.proj.get('EPSG:5181'),
			tileGrid: daumTileGrid,
			tileUrlFunction: getDaumTileUrlFunction('base'),
			tilePixelRatio: 2,              // 타일사이즈 512일때 해상도 비율
		}),
		id: 'daum_base',
		visible: true
	});

	var resolutions_wmts =  daumBaseLayer.N.source.tileGrid.b;

	// map 생성
	map = new ol.Map({
		// Map 생성할 div id
		target: 'map',                          
		layers: [daumBaseLayer],
		view: new ol.View({
			resolutions: resolutions_wmts,
			projection: new ol.proj.get('EPSG:5181'),
			//범위 화면기준 [왼쪽, 아래, 오른쪽, 위]
			extent: [100000, -100000, 700000, 580000],
			// 초기 지도 위치 좌표
			center: [174094.0456430749, 447614.6996967123],        	
			// 초기 지도 위치 줌레벨
			zoom: 10,    
			maxZoom: 18,
			minZoom: 4
		}),
		logo: false,
		controls: ol.control.defaults({
			attributionOptions: {
				collapsible: false
			}
		}).extend([]),
		interactions: ol.interaction.defaults({
			altShiftDragRotate: true
			, onFocusOnly: false
			, doubleClickZoom: false
			, keyboard: false
			, mouseWheelZoom: true
			, shiftDragZoom: false
			, dragPan: true
			, pinchRotate: true
			, pinchZoom: true
		})
	});

	map.on('moveend', moveend);
	map.getView().on('change:resolution', changeresolution);

	map.on('singleclick', clickmap);

}






function addBaseLayer(map) {
	// ------------------------------
	// daum(kakao) layers
	// ------------------------------

	// daum base
	var daumBaseLayer = new ol.layer.Tile({
		source: new ol.source.XYZ({
			projection: 'EPSG:5181',
			tileGrid: daumTileGrid,
			tileUrlFunction: getDaumTileUrlFunction('base'),
			tilePixelRatio: 2,              // 타일사이즈 512일때 해상도 비율
		}),
		id: 'daum_base',
		visible: true
	});
	map.addLayer(daumBaseLayer);

	// daum satellite
	var daumSatelliteLayer = new ol.layer.Tile({
		source: new ol.source.XYZ({
			projection: 'EPSG:5181',
			tileGrid: daumTileGrid,
			tileUrlFunction: getDaumTileUrlFunction('satellite'),
			tilePixelRatio: 2,              // 타일사이즈 512일때 해상도 비율
		}),
		id: 'daum_satellite',
		visible: false
	});
	map.addLayer(daumSatelliteLayer);

}


var daumTileGrid = new ol.tilegrid.TileGrid({
	extent: [(-30000 - 524288), (-60000 - 524288), (494288 + 524288), (988576 + 524288)],
	//extent: [86765.33973479667,384759.4715248882,332525.33973479667,497015.4715248882], ///나중에 해당 시군구의 익스텐트로 현재는 인천시 적당하게.

	tileSize: 256,
	resolutions: [4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
	minZoom: 1
});

function getDaumTileUrlFunction(type) {

	var tileUrlFunction = function(tileCoord, pixelRatio, projection) {

		var res = this.getTileGrid().getResolutions();
		var sVal = res[tileCoord[0]];

		var yLength = 988576 - (-60000) + 524288 + 524288;
		var yTile = yLength / (sVal * this.getTileGrid().getTileSize());

		var tileGap = Math.pow(2, (tileCoord[0] - 1));
		yTile = yTile - tileGap;

		var xTile = tileCoord[1] - tileGap;

		if (type == 'base') {
			return 'http://map' + Math.floor((Math.random() * (4 - 1 + 1)) + 1) + '.daumcdn.net/map_2d_hd/2111ydg/L' + (15 - tileCoord[0]) + '/' + (yTile + tileCoord[2]) + '/' + xTile + '.png';
		} else if (type == 'satellite') {
			return 'https://map' + Math.floor((Math.random() * (4 - 1 + 1)) + 1) + '.daumcdn.net/map_skyview_hd/L' + (15 - tileCoord[0]) + '/' + (yTile + tileCoord[2]) + '/' + xTile + '.jpg';
		} else if (type == 'hybrid') {
			return 'http://map' + Math.floor((Math.random() * (4 - 1 + 1)) + 1) + '.daumcdn.net/map_hybrid_hd/2111ydg/L' + (15 - tileCoord[0]) + '/' + (yTile + tileCoord[2]) + '/' + xTile + '.png';
		}

	};
	return tileUrlFunction;

}


function initProj() {

	// google 좌표계
	proj4.defs('EPSG:3857', '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs');

	// UTM-K 좌표계
	proj4.defs('EPSG:5179', '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

	// 중부원점(GRS80) [200,000 500,000]
	proj4.defs('EPSG:5181', '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs');

}