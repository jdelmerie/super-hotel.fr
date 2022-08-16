package fr.fms.superhotelapi.service;

import fr.fms.superhotelapi.dao.UsersRepository;
import fr.fms.superhotelapi.entites.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements APIService<Users> {

    @Autowired
    UsersRepository usersRepository;

    @Override
    public List<Users> getAll() {
        return null;
    }

    @Override
    public Optional<Users> getOneById(long id) {
        return Optional.empty();
    }

    @Override
    public Users save(Users obj) {
        return usersRepository.save(obj);
    }

    @Override
    public void delete(long id) {

    }
}
