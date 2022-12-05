var VM = new Vue({
	el:'#app',
	components:{
		'li-img-component':li_img_component,
		'tr-component':tr_component
	},
	data:{
		page:{map:true,bottominfo:false,location:false,eventDetailInfoPage:false},
		topinfo:false,
		gnbmenu:true,
		eventInfo:'',
		eventDetailInfo:''
	},
	methods:{
		showEventDetailInfo:function () {
			changeVisibility();
			this.page.eventDetailInfoPage = true;
			
			this.eventDetailInfo = this.eventInfo;
		}
	}
})


function receiveEventInfo(data) {
	VM.eventInfo = data;
	console.log(data);
}



function searchMinwon() {
	
}
function charger_changeMap() {
	
}
function checkGPS_geolocation_charger() {
	
}
function systemInfo() {
	
}


function goBack () {
	if (VM.page.eventDetailInfoPage) {
		changeVisibility();
		VM.page.eventDetailInfoPage = false
	}
}


function changeVisibility(){
	//map을 true로 바꿔줘야지 정상적으로 작동함 그냥 true false 만 할 경우 지도가 다시 그려지지 않아서 이렇게 함
	//main.topInfo[0].show = false;
	VM.page.map = !VM.page.map; 
	if (VM.page.map) {
		$('#map').css('visibility','visible');
		console.log("changeVisibility visible 변경");
	} else {
		$('#map').css('visibility','hidden');		
		console.log("changeVisibility hidden 변경");
	}
}