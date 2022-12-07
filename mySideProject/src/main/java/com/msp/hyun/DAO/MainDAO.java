package com.msp.hyun.DAO;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import com.msp.hyun.DTO.BodyGuardDTO;
import com.msp.hyun.DTO.EventInfoDTO;
import com.msp.hyun.DTO.ParamsDTO;


//@Repository
@Mapper
public interface MainDAO {
	
	
	EventInfoDTO selectEventInfo(ParamsDTO param);;

	int insEvent(EventInfoDTO params);

	List<BodyGuardDTO> selectBodyguards(EventInfoDTO params);
}
