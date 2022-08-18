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
public class Hotelier implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstname;
    private String lastname;

    @OneToMany(mappedBy = "hotelier", fetch = FetchType.EAGER) @JsonIgnore
    private List<Hotel> hotels = new ArrayList<>();

    @OneToOne
    private Users user;

    public Hotelier(Long id, String firstname, String lastname, Users user) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.user = user;
    }

    @Override
    public String toString() {
        return "Hotelier{" +
                "id=" + id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", hotels=" + hotels +
                '}';
    }
}
