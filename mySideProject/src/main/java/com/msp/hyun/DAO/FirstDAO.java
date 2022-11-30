package com.msp.hyun.DAO;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.msp.hyun.DTO.MmbrDTO;

@Mapper
public interface FirstDAO {
	
	List<MmbrDTO> selectMmbrList();;
}
