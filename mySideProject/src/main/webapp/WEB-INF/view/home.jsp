<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	
	<title>Insert title here</title>
	
	<!-- jquery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
 
    <!-- openlayers -->
    <link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
    <script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>
    
    <!-- proj4js-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.2/proj4.js"></script>
    
    <!-- js -->
    <script type="text/javascript" src="/js/init.js"></script>
 
    <style>
        body {
            margin: 0;
        }
        .map {
            width: 100%;
            height:100%;
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
	<div id="map" class="map"></div>
</body>
</html>