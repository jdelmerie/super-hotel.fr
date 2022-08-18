package fr.fms.superhotelapi.controller;

import fr.fms.superhotelapi.entites.Hotel;
import fr.fms.superhotelapi.entites.Hotelier;
import fr.fms.superhotelapi.service.HotelierServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/hotelier")
public class HotelierController {

    @Autowired
    private HotelierServiceImpl hotelierService;

    @GetMapping("/all")
    public List<Hotelier> listOfHoteliers() {
        return hotelierService.getAll();
    }

    @PostMapping("/add")
    public void save(@RequestBody Hotelier hotelier) {
        hotelierService.save(hotelier);
    }

    @PutMapping("/update/{id}")
    public void update(@PathVariable("id") long id, @RequestBody Hotelier hotelier) {
        hotelierService.save(hotelier);
    }

    @GetMapping("/get/{id}")
    public Hotelier get(@PathVariable("id") long id) {
        return hotelierService.getOneById(id).get();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id){
        hotelierService.delete(id);
    }

    @GetMapping("/getByUser/{userId}")
    public Hotelier getByUser(@PathVariable("userId") long userId){
       return hotelierService.getByUserId(userId);
    }

    @GetMapping("/{id}/hotels")
    public List<Hotel> getHotelsByHotelierId(@PathVariable("id") long id){
        return hotelierService.getOneById(id).get().getHotels();
    }
}
