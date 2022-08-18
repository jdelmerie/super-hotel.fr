package fr.fms.superhotelapi.service;

import fr.fms.superhotelapi.dao.HotelierRepository;
import fr.fms.superhotelapi.entites.Hotelier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelierServiceImpl implements APIService<Hotelier> {

    @Autowired
    HotelierRepository hotelierRepository;

    @Override
    public List<Hotelier> getAll() {
        return hotelierRepository.findAll();
    }

    @Override
    public Optional<Hotelier> getOneById(long id) {
        return Optional.of(hotelierRepository.getById(id));
    }

    @Override
    public Hotelier save(Hotelier obj) {
        return hotelierRepository.save(obj);
    }

    @Override
    public void delete(long id) {
        hotelierRepository.deleteById(id);
    }

    public Hotelier getByUserId(long userId){
        return hotelierRepository.findByUserId(userId);
    }
}
