package fr.fms.superhotelapi;

import fr.fms.superhotelapi.entites.*;
import fr.fms.superhotelapi.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@SpringBootApplication
public class SuperhotelapiApplication implements CommandLineRunner {

	@Autowired
	RoleServiceImpl roleService;

	@Autowired
	UserServiceImpl userService;

	@Autowired
	CityServiceImpl cityService;

	@Autowired
	HotelServiceImpl hotelService;

	@Autowired
	HotelierServiceImpl hotelierService;

	Random rand = new Random();
	int randNumberOfRooms = rand.nextInt((100 - 10) + 1) + 10;
	int randNumberOfStars = rand.nextInt((5 - 1) + 1) + 1;


	public static void main(String[] args) {
		SpringApplication.run(SuperhotelapiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		String mdp = "$2a$12$.Hcljv26i.wMv7BcDb9jquVJ3V2SpTSZ5EENoeQohDXyclSwieV8."; //123
//
//		City toulouse = cityService.save(new City(null, "Toulouse", "31000"));
//		City paris = cityService.save(new City(null, "Paris", "75000"));
//		City lyon = cityService.save(new City(null, "Lyon", "69000"));
//		City nice = cityService.save(new City(null, "Nice", "06000"));
//		City lille = cityService.save(new City(null, "Lille", "59000"));
//		City bordeeax = cityService.save(new City(null, "Bordeaux", "33000"));
//
//		Role admin = roleService.save(new Role(null, "ADMIN"));
//		Role hotelier = roleService.save(new Role(null, "HOTELIER"));
//		Role user = roleService.save(new Role(null, "USER"));
//
//		List<Role> del = new ArrayList<>();
//		del.add(admin);
//		del.add(user);
//
//		List<Role> mama = new ArrayList<>();
//		mama.add(user);
//		mama.add(hotelier);
//
//		List<Role> nel = new ArrayList<>();
//		nel.add(hotelier);
//
//		List<Role> sebo = new ArrayList<>();
//		sebo.add(user);
//		sebo.add(hotelier);
//
//		userService.save(new Users(null, "j.delmerie@live.fr", "del", mdp, true, del));
//		Users uMama = userService.save(new Users(null, "mama@live.fr", "mamacita", mdp, true, mama));
//		Users uNel = userService.save(new Users(null, "nenel@live.fr", "nenel", mdp, true, nel));
//		Users uSebo = userService.save(new Users(null, "sebo@live.fr", "sebo", mdp, true, sebo));
//
//		Hotelier hotMama = hotelierService.save(new Hotelier(null, "Maryne", "Johnson", uMama));
//		Hotelier hotNel = hotelierService.save(new Hotelier(null, "Elvis", "Presley", uNel));
//		Hotelier hotSebo = hotelierService.save(new Hotelier(null, "Sebastian", "Gomez", uSebo));
//
//		hotelService.save(new Hotel(null, "SH Jean Jaures", "Blv Jean Jaures", "jeanjaurestls@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 150, toulouse, hotNel));
//		hotelService.save(new Hotel(null, "SH Basso Combo", "55 rue des bassos", "bassocombotls@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 80, toulouse, hotNel));
//		hotelService.save(new Hotel(null, "SH Saint Nicolas", "Place saint nicolas", "stnicolasnice@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 140, nice, hotMama));
//		hotelService.save(new Hotel(null, "SH Cité des vins", "Centre ville Quicones", "citedesvinsbordeaux@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 260, bordeeax, hotMama));
//		hotelService.save(new Hotel(null, "SH Tour Eiffel", "Rive gauche", "toureiffelparis@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 175, paris, hotNel));
//		hotelService.save(new Hotel(null, "SH Montparnasse", "Bd de Vaugirard", "parismontparnasse@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 120, paris, hotNel));
//		hotelService.save(new Hotel(null, "SH Part Dieu", "Rue de la Gare", "lyonpartdieu@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 80, lyon, hotSebo));
//		hotelService.save(new Hotel(null, "SH Garibaldi", "Bd du vieux Nice", "nicegaribaldi@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 150, nice, hotMama));
//		hotelService.save(new Hotel(null, "SH Carmes", "Rue de la Dalbade", "carmestoulouse@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 130, toulouse, hotMama));
//		hotelService.save(new Hotel(null, "SH La Bastide", "Quai droite de la garonne", "bordeauxlabastide@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 340, bordeeax, hotSebo));
//		hotelService.save(new Hotel(null, "SH Blagnac", "Route de l'aéroport", "toulouseblagnac@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 150, toulouse, hotSebo));
//		hotelService.save(new Hotel(null, "SH Gerland", "Rue du stade", "lyonGerland@superhotel.fr", "0123456789", "noimage.png", rand.nextInt((100 - 10) + 1) + 10, rand.nextInt((5 - 1) + 1) + 1, 230, lyon, hotSebo));
	}
}
