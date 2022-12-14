package com.msp.hyun.Service;


import java.util.List;

import com.msp.hyun.DTO.BodyGuardDTO;
import com.msp.hyun.DTO.EventInfoDTO;
import com.msp.hyun.DTO.ParamsDTO;


public interface MainService {
	public EventInfoDTO getEventInfo(ParamsDTO params);

	public Boolean insEvent(EventInfoDTO params);

	public List<BodyGuardDTO> getBodyguards(EventInfoDTO params);

	public Boolean insEventBodyguard(EventInfoDTO params);

	


}
