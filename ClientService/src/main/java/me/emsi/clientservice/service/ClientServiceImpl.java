package me.emsi.clientservice.service;

import me.emsi.clientservice.entity.Client;
import me.emsi.clientservice.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService{
    @Autowired
    private ClientRepository clientRepository;
    @Override
    public List<Client> findAll() {
        return clientRepository.findAll();
    }
    @Override
    public Client findById(Long id) throws Exception {
        return clientRepository.findById(id).orElseThrow(()->new Exception("Invalid Client ID"));
    }
    @Override
    public void addClient(Client client) {
        clientRepository.save(client);
    }
}
