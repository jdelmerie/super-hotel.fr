package fr.fms.superhotelapi.controller;

import fr.fms.superhotelapi.entites.Hotel;
import fr.fms.superhotelapi.service.HotelServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/hotel")
public class HotelController {

    @Autowired
    private HotelServiceImpl hotelService;

    @GetMapping("/all")
    public List<Hotel> listOfHotels() {
        return hotelService.getAll();
    }

    @PostMapping("/add")
    public void save(@RequestBody Hotel hotel) {
        hotelService.save(hotel);
    }

    @PutMapping("/update/{id}")
    public void update(@PathVariable("id") long id, @RequestBody Hotel hotel) {
        hotelService.save(hotel);
    }

    @GetMapping("/get/{id}")
    public Hotel get(@PathVariable("id") long id) {
        return hotelService.getOneById(id).get();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id){
        hotelService.delete(id);
    }

    @GetMapping(path = "/image/{id}")
    public byte[] getImage(@PathVariable("id") Long id) throws Exception {
        Hotel hotel = hotelService.getOneById(id).get();
        return Files.readAllBytes(Paths.get("uploads").resolve(hotel.getImage()));
    }

    @GetMapping("/city/{id}")
    public List<Hotel> getHotelsByCity(@PathVariable("id") long id) {
        return hotelService.getByCity(id);
    }
    @GetMapping("/city/search/{search}")
    public List<Hotel> getBySearchCityName(@PathVariable("search") String search) {
        return hotelService.getBySearchCityName(search);
    }
}
