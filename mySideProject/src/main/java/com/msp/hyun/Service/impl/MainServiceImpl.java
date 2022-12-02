package com.msp.hyun.Service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.msp.hyun.DAO.MainDAO;
import com.msp.hyun.DTO.EventInfoDTO;
import com.msp.hyun.DTO.ParamsDTO;
import com.msp.hyun.Service.MainService;



@Service
public class MainServiceImpl implements MainService{
	
	@Autowired
	private MainDAO dao;
	

	@Override
	public EventInfoDTO getEventInfo(ParamsDTO params) {
		System.out.println(params);
		return dao.selectEventInfo(params);
	}
}
