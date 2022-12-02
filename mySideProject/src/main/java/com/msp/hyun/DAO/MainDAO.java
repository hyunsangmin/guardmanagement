package com.msp.hyun.DAO;


import org.apache.ibatis.annotations.Mapper;

import com.msp.hyun.DTO.EventInfoDTO;
import com.msp.hyun.DTO.ParamsDTO;


@Mapper
public interface MainDAO {
	
	EventInfoDTO selectEventInfo(ParamsDTO params);
}
