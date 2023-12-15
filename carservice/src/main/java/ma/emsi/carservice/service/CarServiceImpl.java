package ma.emsi.carservice.service;

import ma.emsi.carservice.beans.Car;
import ma.emsi.carservice.beans.Client;
import ma.emsi.carservice.model.CarResponse;
import ma.emsi.carservice.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CarServiceImpl implements CarService{
    @Autowired
    private CarRepository carRepository;
    @Autowired
    private RestTemplate restTemplate;
    private final String URL="http://localhost:8888";
    @Override
    public List<CarResponse> findAll() {
        List<Car> cars = carRepository.findAll();
        ResponseEntity<Client[]> response = restTemplate.getForEntity(this.URL+"/api/client",Client[].class);
        Client[] clients = response.getBody();
        return cars.stream().map((Car car) -> mapToCarResponse(car,clients)).toList();
    }

    private CarResponse mapToCarResponse(Car car,Client[] clients) {
        Client foundClient = (Client) Arrays.stream(clients)
                .filter(client -> client.getId() == car.getClient_id());
        return CarResponse.builder()
                .id(car.getId())
                .brand(car.getBrand())
                .client(foundClient)
                .matricue(car.getMatricue())
                .model(car.getModel())
                .build();
    }

    @Override
    public CarResponse findById(Long id) throws Exception {
        Car car= carRepository.findById(id).orElseThrow(()->new Exception("Invalid Car Id"));
        Client client = restTemplate.getForObject(this.URL+"/api/client/"+car.getClient_id(),Client.class);
        return CarResponse.builder()
                .id(car.getId())
                .brand(car.getBrand())
                .client(client)
                .matricue(car.getMatricue())
                .model(car.getModel())
                .build();
    }
}
