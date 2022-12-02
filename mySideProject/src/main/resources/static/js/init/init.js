var map;

var vectorSource = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

var features = new ol.Collection();
var areaSource = new ol.source.Vector({
    features: features
});

var areaVectorLayer = new ol.layer.Vector({
    source: areaSource,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 167, 66, 0.4)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ff7733',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ff7733'
            })
        })
    })
});
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
		layers: [daumBaseLayer,vectorLayer,areaVectorLayer],
		view: new ol.View({
			resolutions: resolutions_wmts,
			projection: new ol.proj.get('EPSG:5181'),
			//범위 화면기준 [왼쪽, 아래, 오른쪽, 위]
			extent: [100000, -100000, 700000, 580000],
			// 초기 지도 위치 좌표
			center: [173261.25,442092],        	
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

	map.getViewport().addEventListener('dblclick', function(evt) {
		// 기본 Context Menu가 나오지 않게 차단
		evt.preventDefault();
		console.log(evt.x)
		console.log(evt.y)
		
		//console.log(map.getEventCoordinate(evt)); //클릭과 같넹..이거 사용하면되긋어..
		//console.log('5181 add x ' + map.getEventCoordinate(evt)[0] ); //클릭과 같넹..이거 사용하면되긋어..
		//console.log('5181 add y ' + map.getEventCoordinate(evt)[1] ); //클릭과 같넹..이거 사용하면되긋어..
		openContextMenu(evt.x, evt.y)
	})
	map.getViewport().addEventListener('contextmenu', function(evt) {
		// 기본 Context Menu가 나오지 않게 차단
		evt.preventDefault();
		console.log(evt.x)
		console.log(evt.y)
		
		//console.log(map.getEventCoordinate(evt)); //클릭과 같넹..이거 사용하면되긋어..
		//console.log('5181 add x ' + map.getEventCoordinate(evt)[0] ); //클릭과 같넹..이거 사용하면되긋어..
		//console.log('5181 add y ' + map.getEventCoordinate(evt)[1] ); //클릭과 같넹..이거 사용하면되긋어..
		//openContextMenu(evt.x, evt.y)
	})
	
	
}
function openContextMenu(x, y) {
    $('.contextMenu').remove();
    $('body').append('<div class="contextMenu" style=" top: ' + y + 'px; left:' + x + 'px;">' +
        '<div class="menuItem" onclick="handleContexMenuEvent(\'zoomIn\', \''+ x +'\', \''+ y +'\');"> Zoom In </div>' +
		'<div class="menuItem" onclick="handleContexMenuEvent(\'zoomOut\', \''+ x +'\', \''+ y +'\');"> Zoom Out </div>' +
		'<div class="menuItem" onclick="handleContexMenuEvent(\'centerMap\', \''+ x +'\', \''+ y +'\');"> Center Map Here </div>' +
		'<div class="menuSeparator"> </div>' +
        '<div class="menuItem" onclick="handleContexMenuEvent(\'addMarker\', \'' + x + '\', \'' + y + '\');"> Add Marker </div>' +
        '<div class="menuItem" onclick="handleContexMenuEvent(\'addArea\', \'' + x + '\',  \'' + y + '\');"> Add Area </div>' +
        '</div>');
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