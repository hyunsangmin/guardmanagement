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


<!-- 카카오api 키값 -->
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=522d5986d42523c407847242522becdd"></script>

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
				<a class="btn_back" onclick="goBack()"><img src="/images/ic_back.svg"
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
						<div v-if="eventInfo != '' " @click="showEventDetailInfo()"
							class="selpoint_info">
							<span> <img src="/images/marker1.png" />
							</span>
							<p>
								{{eventInfo.eventName}} <span>{{eventInfo.roadAddress ==
									"" ? eventInfo.numberAddress : eventInfo.roadAddress }}</span>
							</p>
						</div>
					</div>
				</template>


				<template v-if="page.eventDetailInfoPage">
					<div>
						<div v-if="topinfo" class="topinfo"></div>
						<div class="scrollbx bg" id="scrollbx bg">
							<dl class="contbx">
								<!-- 행사정보 -->
								<dt>행사정보</dt>
								<dd>
									<table class="tbview">
										<caption></caption>
										<colgroup>
											<col style="width: 30%" />
											<col style="width: 70%" />
										</colgroup>
										<tbody>
											<!-- 
											<template>
												<tr-component v-bind:propsdata="eventDetailInfo.eventName"
													v-bind:text="'행사명'" /></tr-component>
												<tr-component
													v-bind:propsdata="eventDetailInfo.eventStartTime"
													v-bind:text="'행사시작 일시'"></tr-component>
												<tr-component
													v-bind:propsdata="eventDetailInfo.eventEndTime"
													v-bind:text="'행사종료 일시'"></tr-component>
												<tr-component
													v-bind:propsdata="eventDetailInfo.numberAddress"
													v-bind:text="'지번'" /></tr-component>
												<tr-component v-bind:propsdata="eventDetailInfo.roadAddress"
													v-bind:text="'도로명'" /></tr-component>
												<tr-component
													v-bind:propsdata="eventDetailInfo.eventManagerPhone"
													v-bind:text="'담당자 번호'" /></tr-component>
											</template>
											<tr>
												<th scope="row">경호원</th>
												<td v-if="eventDetailInfo.arrbodyguard != '' ">{{eventDetailInfo.arrbodyguard[0].employee_name}}
													외 {{(eventDetailInfo.arrbodyguard.length -1)}}명</td>
												<td v-else>0명</td>
											</tr>
										 -->
											<tr>
												<th scope="row">행사명</th>
												<td><input type="text" placeholder="여기를 눌러 입력하십시오"
													v-model="eventDetailInfo.eventName" /></td>
											</tr>
											<tr>
												<th scope="row">행사시작 일시</th>
												<td><input type="text" v-model="eventDetailInfo.eventStartTime" /></td>
											</tr>
											<tr>
												<th scope="row">행사종료 일시</th>
												<td><input type="text" v-model="eventDetailInfo.eventEndTime" /></td>
											</tr>
											<tr>
												<th scope="row">지번</th>
												<td><input type="text" placeholder="여기를 눌러 입력하십시오"
													v-model="eventDetailInfo.numberAddress" /></td>
											</tr>
											<tr>
												<th scope="row">도로명</th>
												<td><input type="text" placeholder="여기를 눌러 입력하십시오"
													v-model="eventDetailInfo.roadAddress" /></td>
											</tr>
											<tr>
												<th scope="row">담당자 번호</th>
												<td><input type="text" placeholder="여기를 눌러 입력하십시오"
													v-model="eventDetailInfo.eventManagerPhone" /></td>
											</tr>
											<tr>
												<th scope="row">경호원</th>
												<td v-if="eventDetailInfo.arrbodyguard.length > 1 "><input type="text" placeholder="여기를 눌러 입력하십시오"
													v-model="eventDetailInfo.arrbodyguard[0].employee_name +' 포함 '+eventDetailInfo.arrbodyguard.length+'명'" @click="getBodyGuards()" /></td>
												<td v-if="eventDetailInfo.arrbodyguard.length == 1 "><input type="text" placeholder="여기를 눌러 입력하십시오"
													v-model="eventDetailInfo.arrbodyguard[0].employee_name" @click="getBodyGuards()" /></td>
												<td v-else-if="eventDetailInfo.arrbodyguard.length == 0"><input type="text" placeholder="여기를 눌러 입력하십시오"
													 @click="getBodyGuards()" /></td>
												
												
											</tr>
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

				<template v-if="page.eventAddingPage">
					<div>
						<div v-if="topinfo" class="topinfo"></div>
						<div class="scrollbx bg" id="scrollbx bg">
							<dl class="contbx">
								<!-- 행사정보 -->
								<dt>행사정보</dt>
								<dd>
									<table class="tbview">
										<caption></caption>
										<colgroup>
											<col style="width: 30%" />
											<col style="width: 70%" />
										</colgroup>
										<tbody>
											<tr>
												<th scope="row">행사명</th>
												<td><input type="text" placeholder="여기를 눌러 입력하십시오"
													v-model="eventAddingInfo.event_name" /></td>
											</tr>
											<tr>
												<th scope="row">행사시작 일시</th>
												<td><input type="date"
													v-model="eventAddingInfo.event_start_date" /><input
													type="time" v-model="eventAddingInfo.event_start_time" /></td>
											</tr>
											<tr>
												<th scope="row">행사종료 일시</th>
												<td><input type="date"
													v-model="eventAddingInfo.event_end_date" /><input
													type="time" v-model="eventAddingInfo.event_end_time" /></td>
											</tr>
											<tr>
												<th scope="row">지번</th>
												<td><input type="text" placeholder="여기를 눌러 입력하십시오"
													v-model="eventAddingInfo.number_address" /></td>
											</tr>
											<tr>
												<th scope="row">도로명</th>
												<td><input type="text" placeholder="여기를 눌러 입력하십시오"
													v-model="eventAddingInfo.road_address" /></td>
											</tr>
											<tr>
												<th scope="row">담당자 번호</th>
												<td><input type="text" placeholder="여기를 눌러 입력하십시오"
													v-model="eventAddingInfo.event_manager_phone" /></td>
											</tr>
											<!-- 배치신고서 사진 -->
										</tbody>
									</table>
								</dd>
							</dl>
						</div>
						<div class="bottombx">
							<button class="btn_cancel fl wp50" onclick="goBack()">취소</button>
							<button class="btn_confirm fr wp50" @click="setEvent()">저장</button>
						</div>
					</div>
				</template>


				<!-- ppt27 예상단수 종료시간 선택 -->
				<template v-if="page.bodyguardPage">
					<div class="scrollbx">
						<table class="tblist">
							<caption></caption>
							<colgroup>
								<col style="width: 80%" />
								<col style="width: 20%" />
							</colgroup>
							<tbody>
								<tr v-for="(BG, index) in bodyguards"
									v-on:click="document.getElementById('iem_id_label_'+index).click()">
									<th>{{BG.employeeName}}</th>
									<td><label class="chkbx" :id="'iem_id_label_'+index">
											<input type="checkbox" v-bind:value="BG.employeeId" name="chkbx_iem_code" /> 
											<span class="checkmark"></span>
									</label></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="bottombx">
						<button class="btn_confirm" @click="setBodyguards()">확인</button>
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