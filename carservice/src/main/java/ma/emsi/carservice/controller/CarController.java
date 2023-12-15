package ma.emsi.carservice.controller;


import ma.emsi.carservice.beans.Car;
import ma.emsi.carservice.beans.Client;
import ma.emsi.carservice.model.CarResponse;
import ma.emsi.carservice.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("api/car")
public class CarController {
    @Autowired
    private CarService carService;
    @GetMapping
    public String findAll(){
        return "Test";
    }

    @GetMapping("/{id}")
    public CarResponse findById(@PathVariable Long id) throws Exception {
        return carService.findById(id);
    }
}
