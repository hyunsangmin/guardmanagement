package com.msp.hyun.controller;





import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.msp.hyun.DTO.EventInfoDTO;
import com.msp.hyun.DTO.ParamsDTO;
import com.msp.hyun.Service.MainService;




@RestController
@RequestMapping("/main")
public class MainController {
	
	private ModelAndView mav;
	
	@Autowired
	private MainService ms;
	/*
	@GetMapping("/first")
	public List<MmbrDTO> getFirst() {
		System.out.println("controller");
		List<MmbrDTO> result = fs.helloWorld();	
		return result;
	}
	*/
	
	@GetMapping("login")
	public ModelAndView loginPage() {
		mav = new ModelAndView();
		mav.setViewName("home");
		return mav;
	}
	@PostMapping("eventinfopost")
	public EventInfoDTO getEventInfo(@RequestBody ParamsDTO params) {
		//public EventInfoDTO getEventInfo(@RequestBody Map<String, String> params) {
		EventInfoDTO ei = ms.getEventInfo(params);
		//System.out.println(params);
		System.out.println(params);
		System.out.println(ei);
		return ei;
	}
	
	@GetMapping("eventinfo")
	public EventInfoDTO getEventInfoget(ParamsDTO params) {
		System.out.println(params);
		EventInfoDTO ei = ms.getEventInfo(params);
		return ei;
	}

}
