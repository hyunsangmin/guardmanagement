package com.msp.hyun.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.msp.hyun.DTO.MmbrDTO;
import com.msp.hyun.Service.FirstService;




@RestController
@RequestMapping("/main")
public class MainController {
	
	private ModelAndView mav;
	
	@Autowired
	private FirstService fs;
	
	@GetMapping("/first")
	public List<MmbrDTO> getFirst() {
		System.out.println("controller");
		List<MmbrDTO> result = fs.helloWorld();	
		return result;
	}
	
	@GetMapping("/login")
	public ModelAndView loginPage() {
		mav = new ModelAndView();
		mav.setViewName("home");
		return mav;
	}

}
