package me.emsi.clientservice.controller;


import me.emsi.clientservice.entity.Client;
import me.emsi.clientservice.service.ClientService;
import me.emsi.clientservice.service.ClientServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/client")
public class ClientController {
    @Autowired
    private ClientServiceImpl service;
    @GetMapping
    public List<Client> findAll(){
        return service.findAll();
    }
    @GetMapping("/{id}")
    public Client findById(@PathVariable Long id) throws Exception {return service.findById(id);}
    @PostMapping
    public void addClient(@RequestBody Client client){service.addClient(client);}
}