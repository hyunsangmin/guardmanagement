package com.msp.hyun.DTO;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class EventInfoDTO {
	String eventNo;
	String numberAddress;
	String roadAddress;
	String companyCode;
	String eventName;
	String eventManagerPhone;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	String eventStartTime;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	String eventEndTime;
	String geom5181;
}
