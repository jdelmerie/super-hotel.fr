package fr.fms.superhotelapi.entites;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor @Builder
public class Hotel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String address;
    private String email;
    private String phone;
    private String image;
    private int numberOfRooms;
    private int numberOfStars;

    @ManyToOne
    private City city;

    @ManyToOne
    @JoinColumn(name = "hotelier_id")
    private Hotelier hotelier;

    @Override
    public String toString() {
        return "Hotel{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", image='" + image + '\'' +
                ", numberOfRooms=" + numberOfRooms +
                ", numberOfStars=" + numberOfStars +
                ", city=" + city +
                ", hotelier=" + hotelier +
                '}';
    }
}
