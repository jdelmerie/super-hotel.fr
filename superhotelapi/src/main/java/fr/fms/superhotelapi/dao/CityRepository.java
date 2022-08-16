package fr.fms.superhotelapi.dao;

import fr.fms.superhotelapi.entites.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
