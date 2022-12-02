//ajax   url, 성공시 동작시킬 펑션이름, 보낼데이터
function sendPostAjax(upurl, fn='', formdata ) {
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
function sendGetAjax(upurl, fn='',formdata="") {
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




