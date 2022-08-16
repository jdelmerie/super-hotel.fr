package fr.fms.superhotelapi.dao;

import fr.fms.superhotelapi.entites.Hotelier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelierRepository extends JpaRepository<Hotelier, Long> {
}
