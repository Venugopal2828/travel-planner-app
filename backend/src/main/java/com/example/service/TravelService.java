package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.entity.Travel;
import com.example.repository.TravelRepo;

@Service
public class TravelService 
{
	
	@Autowired
  private TravelRepo travelRepo;
	
	
	
	public Travel saveDetails(Travel travel)
	{
		return travelRepo.save(travel);
	}
	
	public List<Travel> getallDetails()
	{
		return travelRepo.findAll();
	}
	
	public Travel getTravelDetailsById(int id)
	{
		return travelRepo.findById(id).orElse(null);
	}
	
	public Travel updateTravelDetails(Travel travel)
	{
		Travel updateTravel=travelRepo.findById(travel.getId()).orElse(null);
		if(updateTravel!=null)
		{
			updateTravel.setUsername(travel.getUsername());
			updateTravel.setPassword(travel.getPassword());
			updateTravel.setEmail(travel.getEmail());
			travelRepo.save(updateTravel);
			return updateTravel;
		}
		return null;
	}
	public String deteleTravel(int id)
	{
		travelRepo.deleteById(id);
		return "Deleted"+id;
	}
}
