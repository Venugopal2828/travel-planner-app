package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Travel;
import com.example.service.TravelService;

@RestController
public class TravelController 
{
	@Autowired
  private TravelService travelService;
	@PostMapping("/addtravel")
	public Travel postDetails(@RequestBody Travel travel)
	{
		return travelService.saveDetails(travel);
	}
	@GetMapping("/gettravel")
	public List<Travel> getDetails()
	{
		return travelService.getallDetails();
	}
	@GetMapping("/getDetailsById/{id}")
	public Travel fetchDetailsById(@PathVariable int id)
	{
		return travelService.getTravelDetailsById(id);
	}
	@PutMapping("/updateTravel")
	public Travel updateDetails(@RequestBody Travel travel)
	{
		return travelService.updateTravelDetails(travel);
	}
	@DeleteMapping("/deleteTravel/{id}")
	public String deleteTravelDetails(@PathVariable int id)
	{
		return travelService.deteleTravel(id);
	}


}

