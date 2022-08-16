package fr.fms.superhotelapi.service;

import fr.fms.superhotelapi.dao.RoleRepository;
import fr.fms.superhotelapi.entites.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements APIService<Role> {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<Role> getAll() {
        return null;
    }

    @Override
    public Optional<Role> getOneById(long id) {
        return Optional.empty();
    }

    @Override
    public Role save(Role obj) {
        return roleRepository.save(obj);
    }

    @Override
    public void delete(long id) {

    }
}
