package fr.fms.superhotelapi.dao;

import fr.fms.superhotelapi.entites.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Long> {
}
