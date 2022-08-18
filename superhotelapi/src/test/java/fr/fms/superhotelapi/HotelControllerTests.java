package fr.fms.superhotelapi;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.fms.superhotelapi.service.CityServiceImpl;
import fr.fms.superhotelapi.service.HotelServiceImpl;
import fr.fms.superhotelapi.service.HotelierServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class HotelControllerTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    HotelServiceImpl hotelService;

    @Autowired
    CityServiceImpl cityService;

    @Autowired
    HotelierServiceImpl hotelierService;

    @Autowired
    private ObjectMapper objectMapper;

//    Random rand = new Random();
//    int randNumberOfRooms = rand.nextInt((100 - 10) + 1) + 10;
//    int randNumberOfStars = rand.nextInt((5 - 1) + 1) + 1;
//    int randCity = rand.nextInt((6 - 1) + 1) + 1;
//    int randHotelier = rand.nextInt((2 - 1) + 1) + 1;

    @Test
    public void testGetAllHotels() throws Exception {
        //GIVEN : Déjà fait

        //WHEN
        ResultActions response = mockMvc.perform(get("/hotel/all"));

        //THEN
        response.andExpect(status().isOk()).andDo(print())
                .andExpect(jsonPath("$.size()", is(hotelService.getAll().size())));
    }

    @Test
    public void testGetHotelByIdSuccess() throws Exception {
        //GIVEN
        long id = 1;

        //WHEN
        ResultActions response = mockMvc.perform(get("/hotel/get/{id}", 1));

        //THEN
        response.andExpect(status().isOk()).andDo(print())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.name", is("SH Jean Jaures")));
    }

    @Test
    public void testGetHotelIdDontExist() throws Exception {
        //GIVEN
        Long id = 100L;

        //WHEN
        ResultActions response = mockMvc.perform(get("/hotel/get/{id}", id));

        //THEN
        response.andExpect(status().isNotFound()).andDo(print());
    }
//    @Test
//    public void testSaveAndReturnHotel() throws Exception {
//
//        //GIVEN
//        Hotel hotel = Hotel.builder()
//                .name("SH Test")
//                .address("Rue des tests")
//                .email("shtest@superhotel.fr")
//                .phone("0123456789")
//                .image("noimage.png")
//                .numberOfRooms(randNumberOfRooms)
//                .numberOfStars(randNumberOfStars)
//                .city(cityService.getOneById((long) randCity).get())
//                .hotelier(hotelierService.getOneById((long) randHotelier).get())
//                .build();
//
//
//        //WHEN
//        ResultActions response = mockMvc.perform(post("/hotel/add")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(hotel)));
//
//        //THEN
//        response.andDo(print()).andExpect(status().isCreated())
//                .andExpect(jsonPath("$", notNullValue()))
//                .andExpect(jsonPath("$.name", is(hotel.getName())))
//                .andExpect(jsonPath("$.city", is(hotel.getCity().getName())));
//    }
}
