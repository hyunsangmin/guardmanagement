var VM = new Vue({
	el: '#app',
	components: {
		'li-img-component': li_img_component,
		'tr-component': tr_component
	},
	data: {
		page: { map: true, bottominfo: false, location: false, eventDetailInfoPage: false, eventAddingPage: false, bodyguardPage:false },
		topinfo: false,
		gnbmenu: true,
		eventInfo: '',
		eventDetailInfo:'',
		eventAddingInfo:{},
		bodyguards:'',
		selectBodyguards:''
	},
	methods: {
		showEventDetailInfo: function() {
			changeVisibility();
			this.page.eventDetailInfoPage = true;

			this.eventDetailInfo = this.eventInfo;
		},
		setEvent: function() {
			/*var data = {
				'eventName':this.eventAddingInfo.event_name,
				'numberAddress':this.eventAddingInfo.number_address,
				'roadAddress':this.eventAddingInfo.road_address,
				'companyCode':"CPN001",
				'eventManagerPhone':this.eventAddingInfo.event_manager_phone,
				'eventStartTime':this.eventAddingInfo.event_start_date+' '+this.eventAddingInfo.event_start_time,
				'eventEndTime':this.eventAddingInfo.event_end_date+' '+this.eventAddingInfo.event_end_time,
				'geom5181':dbclick_5181xy[0]+' '+dbclick_5181xy[1]
			}*/
			var data = {
				'eventName':"크리스마스휴가",
				'numberAddress':"인천 부평구 십정동 289-8",
				'roadAddress':"인천광역시 부평구 열우물로 90 더샵부평센트럴시티",
				'companyCode':"CPN001",
				'eventManagerPhone':"010-9870-9661",
				'eventStartTime':"2022-12-23 18:00",
				'eventEndTime':"2022-12-27 18:00",
				'geom5181':'POINT (' + dbclick_5181xy[0] + ' ' + dbclick_5181xy[1] + ' )'
				//'geom5181':"173308 441972",				
				//'x':'173308',
				//'y':'441972'
				//'location':dbclick_5181xy				
			}
			sendPostAjax('eventadding', 'receiveEventAdding', data);
			console.log(this.eventAddingInfo)
		},
		getBodyGuards: function () {
			
			var data = {
				'companyCode':"CPN001",
			
				'arrangedBodyguard': ["EMP001","EMP002"]
			}
			sendGetAjax('bodyguards', 'receiveBodyguards', data);
		},
		setBodyguards: function() {
			let arr = [];
			$("input:checkbox[name=chkbx_iem_code]").each(function(i,ival) {
				if ($(this).is(":checked") == true) {
					arr.push(ival);
				}
			})
			console.log(arr)
		}
	}
})


function receiveBodyguards (data) {
	console.log(data)
	VM.bodyguards = data;
	VM.page.eventAddingPage = false;
	VM.page.eventDetailInfoPage = false;
	
	VM.page.bodyguardPage = true;
}

function receiveEventAdding(data) {
	alert(data);
}

function receiveEventInfo(data) {
	if (data.arrbodyguard == "[]") {
		data.arrbodyguard = ''
	} else {
		
	}
	console.log(data);
	if (data != '' && data.arrbodyguard != '') {
		console.log(JSON.parse(data.arrbodyguard)[0]);
		data.arrbodyguard = JSON.parse(data.arrbodyguard);
	}
	VM.eventInfo = data;
}







function addEventPlace() {
	$('.contextMenu').hide();
	var WGS84 = ol.proj.transform([ dbclick_5181xy[0] ,dbclick_5181xy[1] ],  'EPSG:5181',ol.proj.get('EPSG:4326'));
	sendGetAjax_kakaolocal(WGS84);
	

}




function searchMinwon() {

}
function charger_changeMap() {

}
function checkGPS_geolocation_charger() {

}
function systemInfo() {

}


function goBack() {
	if (VM.page.eventDetailInfoPage) {
		changeVisibility();
		VM.page.eventDetailInfoPage = false
	} else if (VM.page.eventAddingPage) {
		changeVisibility();
		VM.page.eventAddingPage = false
	}
}


function changeVisibility() {
	//map을 true로 바꿔줘야지 정상적으로 작동함 그냥 true false 만 할 경우 지도가 다시 그려지지 않아서 이렇게 함
	//main.topInfo[0].show = false;
	VM.page.map = !VM.page.map;
	if (VM.page.map) {
		$('#map').css('visibility', 'visible');
		console.log("changeVisibility visible 변경");
	} else {
		$('#map').css('visibility', 'hidden');
		console.log("changeVisibility hidden 변경");
	}
}