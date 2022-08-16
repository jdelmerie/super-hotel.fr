package fr.fms.superhotelapi.service;

import fr.fms.superhotelapi.dao.CityRepository;
import fr.fms.superhotelapi.entites.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImpl implements APIService<City> {

    @Autowired
    CityRepository cityRepository;

    @Override
    public List<City> getAll() {
        return cityRepository.findAll();
    }

    @Override
    public Optional<City> getOneById(long id) {
        return Optional.of(cityRepository.getById(id));
    }

    @Override
    public City save(City obj) {
        return cityRepository.save(obj);
    }

    @Override
    public void delete(long id) {
        cityRepository.deleteById(id);
    }
}
