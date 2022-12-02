<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<title>Insert title here</title>

<link type="text/css" rel="stylesheet" href="/css/common.css" />

<!-- jquery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- openlayers -->
<link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
<script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>

<!-- proj4js-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.2/proj4.js"></script>


<!-- js -->
<script type="text/javascript" src="/js/common/contextMenu.js"></script>
<script type="text/javascript" src="/js/map/olMapFunctions.js"></script>
<script type="text/javascript" src="/js/init/init.js"></script>
<script type="text/javascript" src="/js/common/ajax.js"></script>
<script type="text/javascript" src="/js/map/mapMain.js"></script>


<style>
body {
	margin: 0;
}

.map {
	width: 100%;
	height: 100%;
}

#baseLayer {
	position: absolute;
	right: 10px;
	top: 10px;
	z-index: 1;
}
</style>

<script>
	// dom ready
	$(document).ready(function() {
		init();
	});
</script>

</head>
<body>
	<div id="map" class="map">
	<!-- 
		<div class="contextMenu" id="myMenu1">
			<ul>
				<li id="cmenu1">메뉴1</li>
				<li id="cmenu2">메뉴2</li>
			</ul>
		</div>
		<script type="text/javascript">
			// <![CDATA[
			$('#map').contextMenu('myMenu1', 'contextmenu', {
				bindings : {
					'cmenu1' : function(t) {
						console.log("메뉴1")
					},
					'cmenu2' : function(t) {
						console.log("메뉴2")
					}
				}

			});
			// ]]>
		</script>
	 -->		
			 
	</div>
</body>
</html>