package com.msp.hyun.Service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.msp.hyun.DAO.FirstDAO;
import com.msp.hyun.DTO.MmbrDTO;
import com.msp.hyun.Service.FirstService;



@Service
public class FirstServiceImpl implements FirstService{
	
	@Autowired
	private FirstDAO dao;
	
	@Override
	public List<MmbrDTO> helloWorld() {
		System.out.println("FirstServiceImpl");
		return dao.selectMmbrList();
	}
}
