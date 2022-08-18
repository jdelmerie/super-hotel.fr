package fr.fms.superhotelapi.controller;

import fr.fms.superhotelapi.entites.Hotel;
import fr.fms.superhotelapi.service.HotelServiceImpl;
import fr.fms.superhotelapi.service.ImageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/hotel")
public class HotelController {

    @Autowired
    private HotelServiceImpl hotelService;

    @Autowired
    private ImageServiceImpl imageService;

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

    @PostMapping("/uploadImage")
    public ResponseEntity<Error> uploadImage(@RequestParam("image") MultipartFile image, @RequestParam("hotelId") long hotelId) {
        try {
            Hotel hotel = hotelService.getOneById(hotelId).get();
            hotel.setImage(image.getOriginalFilename());
            imageService.save(image);
            hotelService.save(hotel);
        } catch (Exception e) {
            String message = "Could not upload the file: " + image.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new Error(message));
        }
        return null;
    }
}
