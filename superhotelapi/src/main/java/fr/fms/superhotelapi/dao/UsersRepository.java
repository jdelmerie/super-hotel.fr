package fr.fms.superhotelapi.dao;

import fr.fms.superhotelapi.entites.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    public Users findByEmail(String email);
}
