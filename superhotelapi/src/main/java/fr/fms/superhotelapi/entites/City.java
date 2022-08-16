package fr.fms.superhotelapi.entites;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class City implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String zipcode;

    @OneToMany(mappedBy = "city") @JsonIgnore
    private Collection<Hotel> hotels;

    public City(Long id, String name, String zipcode) {
        this.id = id;
        this.name = name;
        this.zipcode = zipcode;
    }

    @Override
    public String toString() {
        return "City{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", hotels=" + hotels +
                '}';
    }
}
