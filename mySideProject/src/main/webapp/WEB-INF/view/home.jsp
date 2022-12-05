<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<title>Insert title here</title>

<link type="text/css" rel="stylesheet" href="/css/common.css" />
<link type="text/css" rel="stylesheet" href="/css/default.css" />

<!-- jquery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<!-- openlayers -->
<link rel="stylesheet"
	href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
<script src="https://openlayers.org/en/v4.6.5/build/ol.js"></script>

<!-- proj4js-->
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.2/proj4.js"></script>


<!-- js -->
<script type="text/javascript" src="/js/common/contextMenu.js"></script>
<script type="text/javascript" src="/js/map/olMapFunctions.js"></script>
<script type="text/javascript" src="/js/init/init.js"></script>
<script type="text/javascript" src="/js/common/ajax.js"></script>



<style>
body {
	margin: 0;
}

.map {
	width: 100%;
	height: 100%;
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
	<!-- wrap -->
	<div id="wrap">
		<div id="app">

			<!-- header -->
			<header id="header">
				<a class="btn_back" onclick=""><img src="/images/ic_back.svg"
					alt="이전 아이콘" /></a>
				<h1 @click="asd()">행사장 관리 dfdf</h1>
			</header>

			<!-- container -->
			<section id="container">


				<template>
					<div id="map" class="map" v-show="page.map">
						<div v-if="page.location" class="txt_location">현위치 주소</div>
						<a class="btn_location"> <img src="/images/ic_location.svg"
							alt="현위치 아이콘" />
						</a>
						<div v-if="topinfo" class="topinfo">인포</div>
						<div v-if="eventInfo != '' " @click="showEventDetailInfo()" class="selpoint_info">
							<span> <img src="/images/marker1.png" />
							</span>
							<p>
								{{eventInfo.eventName}} <span>{{eventInfo.roadAddress == "" ? eventInfo.numberAddress : eventInfo.roadAddress }}</span>
							</p>
						</div>
					</div>
				</template>
				
        
        <template v-if="page.eventDetailInfoPage">
        <div>
        	<div v-if="topinfo" class="topinfo"></div>
            <div class="scrollbx bg" id="scrollbx bg" >
                <dl class="contbx">
                <!-- 행사정보 -->
                    <dt>행사정보</dt>
                    <dd>
                        <table class="tbview"> 
                            <caption></caption>
                            <colgroup>
                                <col style="width:30%" />
                                <col style="width:70%" />
                            </colgroup>
                            <tbody>
                            <template>   
                                <tr-component v-bind:propsdata="eventDetailInfo.eventName" v-bind:text="'행사명'"/></tr-component>
                                <tr-component v-bind:propsdata="eventDetailInfo.eventStartTime" v-bind:text="'행사시작 일시'"></tr-component>
                                <tr-component v-bind:propsdata="eventDetailInfo.eventEndTime" v-bind:text="'행사종료 일시'"></tr-component>
                                <tr-component v-bind:propsdata="eventDetailInfo.numberAddress" v-bind:text="'지번'"/></tr-component>
                                <tr-component v-bind:propsdata="eventDetailInfo.roadAddress" v-bind:text="'도로명'"/></tr-component>
                                <tr-component v-bind:propsdata="eventDetailInfo.eventManagerPhone" v-bind:text="'담당자 번호'"/></tr-component>
                            </template>
                            <!-- 배치신고서 사진 -->
                            </tbody>
                        </table>
                    </dd>                          
                </dl>
            </div>
            	<div class="bottombx">

                	<button class="btn_cancel" onclick="goBack()">닫기</button>
            	</div>
        </div> 		
        </template>

				<template>
					<div id="gnbmenu" v-show="gnbmenu">
						<ul>
							<template>
								<li-img-component v-bind:idname="'nomalmenu'"
									v-bind:text="'민원조회'" v-bind:onclickname="'searchMinwon()'"
									v-bind:srcname="'/images/ic_gnb1.svg'"
									v-bind:altname="'민원조회 아이콘'"></li-img-component>
								<li-img-component v-bind:idname="'nomalmenu'"
									v-bind:text="'배경지도'" v-bind:onclickname="'charger_changeMap()'"
									v-bind:srcname="'/images/ic_gnb2.svg'"
									v-bind:altname="'배경지도 아이콘'"></li-img-component>
								<li-img-component v-bind:idname="'gpsmenu'" v-bind:text="'GPS'"
									v-bind:onclickname="'checkGPS_geolocation_charger()'"
									v-bind:srcname="'/images/ic_gnb3.svg'"
									v-bind:altname="'GPS 아이콘'"></li-img-component>
								<li-img-component v-bind:idname="'nomalmenu'"
									v-bind:text="'시스템'" v-bind:onclickname="'systemInfo()'"
									v-bind:srcname="'/images/ic_gnb4.svg'"
									v-bind:altname="'시스템 아이콘'"></li-img-component>
							</template>
						</ul>
					</div>
				</template>
			</section>
		</div>
	</div>
</body>

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>
<script type="text/javascript" src="/js/map/components.js"></script>
<script type="text/javascript" src="/js/map/mapMain.js"></script>
</html>