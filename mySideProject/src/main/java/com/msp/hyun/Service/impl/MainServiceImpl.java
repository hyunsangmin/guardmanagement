package com.msp.hyun.Service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.msp.hyun.DAO.MainDAO;
import com.msp.hyun.DTO.BodyGuardDTO;
import com.msp.hyun.DTO.EventInfoDTO;
import com.msp.hyun.DTO.ParamsDTO;
import com.msp.hyun.Service.MainService;



@Service
public class MainServiceImpl implements MainService{
	
	@Autowired
	private  MainDAO dao;
	

	@Override
	public EventInfoDTO getEventInfo(ParamsDTO params) {
		EventInfoDTO ei = dao.selectEventInfo(params);
		System.out.println(ei);
		return ei;
	}

	@Override
	public Boolean insEvent(EventInfoDTO params) {
		return convertToBoolean(dao.insEvent(params)); 
	}
	
	@Override
	public List<BodyGuardDTO> getBodyguards(EventInfoDTO params) {
		List<BodyGuardDTO> bg = dao.selectBodyguards(params);
		System.out.println(bg);
		return bg;
	}
	
	@Override
	public Boolean insEventBodyguard(EventInfoDTO params) {
		return convertToBoolean(dao.insEventBodyguard(params)); 
	}
	
	boolean convertToBoolean(int value) {
		System.out.println("zzzzzzzzzzzzzzzzzzzzzzzzzzz");
		return (value > 0)? true:false;
	}

}
