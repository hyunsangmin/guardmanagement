//ajax   url, 성공시 동작시킬 펑션이름, 보낼데이터
function sendPostAjax(upurl, fn = '', formdata) {
	console.log(formdata)
	$.ajax({
		type: 'POST',
		url: upurl,
		data: JSON.stringify(formdata),
		contentType: 'application/json',
		//dataType:'josn',
		//processData: true,
		success: function(data) {
			console.log(JSON.stringify(data))
			window[fn](data);
		},
		error: function(data) {
			alert('[ajax_error]데이터(코드) 요청중 에러발생 \n' + data);
			console.log(data.responseText);
		}
	});
}

//ajax url, 성공시 동작시킬 펑션이름, 보낼데이터
function sendGetAjax(upurl, fn = '', formdata = "") {
	console.log(formdata)
	$.ajax({
		type: 'GET',
		url: upurl,
		data: formdata,
		contentType: 'application/json',
		//processData: false,
		success: function(data) {
			console.log(JSON.stringify(data))
			window[fn](data);
		},
		error: function(data) {
			alert('[ajax_error]데이터(코드) 요청중 에러발생 \n' + data);
			console.log(data.responseText);
		}
	});
}



function sendGetAjax_kakaolocal(location) {
	$.ajax({
		url: encodeURI('https://dapi.kakao.com/v2/local/geo/coord2address.json?x=' + location[0] + '&y=' + location[1] + '&input_coord=WGS84'),
		type: 'GET',
		headers: { 'Authorization': 'KakaoAK 6b797b01f49b002453b7355ca16e835f' },
		contentType: 'application/json',
		success: function(data) {
			
			console.log(data);
			console.log(data.documents[0].address);
			console.log(data.documents[0].road_address);
			
			var adr = data.documents[0].address;
			var radr = data.documents[0].road_address;
			VM.eventAddingInfo = {};
			console.log(dbclick_5181xy)
			
			VM.eventAddingInfo.number_address = adr.address_name;
			if (radr == null) {
				VM.eventAddingInfo.road_address = '';
			} else {
				VM.eventAddingInfo.road_address = radr.address_name + ' ' + radr.building_name;
			}
			changeVisibility();
			VM.page.eventAddingPage = true;
		},
		error: function(e) {
			console.log(e);
		}
	});
}


