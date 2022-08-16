package fr.fms.superhotelapi.controller;

import fr.fms.superhotelapi.entites.City;
import fr.fms.superhotelapi.service.CityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/city")
public class CityController {

    @Autowired
    private CityServiceImpl cityService;

    @PostMapping("/add")
    public City add(@RequestBody City city) {
        return cityService.save(city);
    }

    @PutMapping("/update/{id}")
    public void update(@PathVariable("id") long id, @RequestBody City city) {
        cityService.save(city);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id) {
        cityService.delete(id);
    }

    @GetMapping("/get/{id}")
    public City getOne(@PathVariable("id") long id) {
        return cityService.getOneById(id).get();
    }

    @GetMapping("/all")
    public List<City> getAll() {
        return cityService.getAll();
    }
}
