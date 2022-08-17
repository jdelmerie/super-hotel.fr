package fr.fms.superhotelapi.dao;

import fr.fms.superhotelapi.entites.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
    public List<Hotel> findByCityId(long id);
    public List<Hotel> findByCityNameContains(String search);

}
