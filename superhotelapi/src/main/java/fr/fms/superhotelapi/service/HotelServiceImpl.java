package fr.fms.superhotelapi.service;

import fr.fms.superhotelapi.dao.HotelRepository;
import fr.fms.superhotelapi.entites.Hotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class HotelServiceImpl implements APIService<Hotel> {

    @Autowired
    HotelRepository hotelRepository;

    @Override
    public List<Hotel> getAll() {
        return hotelRepository.findAll();
    }

    @Override
    public Optional<Hotel> getOneById(long id) {
//        return Optional.of(hotelRepository.getById(id));
        return Optional.ofNullable(hotelRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found")));
    }

    @Override
    public Hotel save(Hotel obj) {
        return hotelRepository.save(obj);
    }

    @Override
    public void delete(long id) {
        hotelRepository.deleteById(id);
    }

    public List<Hotel> getByCity(long id) {
        return hotelRepository.findByCityId(id);
    }

    public List<Hotel> getBySearchCityName(String search){
        return hotelRepository.findByCityNameContains(search);
    }
}
