
## Microservice Architecture Workshop

This repository contains the necessary resources for the hands-on workshop aimed at developing a deep understanding of microservice architecture. The main objectives of this learning experience include creating and registering microservices, connecting to MySQL database, establishing a microservice Gateway, and implementing synchronous communication between microservices using the OPENFEIGN tool.



# Creation of Discovery Service Eureka

- Create a new project in Spring Initialzr
[![image-2023-12-07-193053655.png](https://i.postimg.cc/QtWpFyN7/image-2023-12-07-193053655.png)](https://postimg.cc/vgb1jXV8)
- Add Eureka Server Dependency
[![image-2023-12-07-193203126.png](https://i.postimg.cc/Fsx0kcvT/image-2023-12-07-193203126.png)](https://postimg.cc/HVVrfrVM)
- in the application.properties add the following lines 
```yaml
server:
    port: 8081
eureka:
    client:
        register-with-eureka: false
        fetch-registry: false
}
```
- add `@EnableEurekaClient ` in main
```java
@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
        }

    }
}
```
- Run the application and Check if the project work on `https://localhost:8761`
[![image-2023-12-07-195027484.png](https://i.postimg.cc/hPxK77V6/image-2023-12-07-195027484.png)](https://postimg.cc/QHX22C4J)

# Creation of Client Service

- Create a new project in Spring Initialzr
[![image-2023-12-07-195308539.png](https://i.postimg.cc/VsCx7P5b/image-2023-12-07-195308539.png)](https://postimg.cc/t79vTf3X)
- Add Necessary Dependency
[![image-2023-12-07-195426196.png](https://i.postimg.cc/sxs49Wvm/image-2023-12-07-195426196.png)](https://postimg.cc/JDYXRG3H)
- in the application.properties add the following lines 
```yaml
server:
  port: 8081
spring:
  application:
    name: SERVICE-CLIENT
  datasource:
      driverClassName: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://localhost:3306/clientservicedb?createDatabaseIfNotExist=true
      username: "root"
      password: <UrPassword>
  jpa:
    hibernate.ddl-auto: update
    generate-ddl: true
    show-sql: true
}
```
- add `@EnableDiscoveryClient ` in main
```java
@EnableDiscoveryClient
@SpringBootApplication
public class ClientServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClientServiceApplication.class, args);
    }

}
```
- Run the Application and Check if the Client Service was added on `https://localhost:8761`
[![image-2023-12-07-200436949.png](https://i.postimg.cc/FHkmQkHD/image-2023-12-07-200436949.png)](https://postimg.cc/NKtZ6MTH)

# Connect the Microservice to a MySQL Database

To create a microservice on Spring Boot capable of connecting to a MySQL database, it is advisable to follow the following multi-layered architecture:

[![image-2023-12-07-200711583.png](https://i.postimg.cc/d0Wzkq3L/image-2023-12-07-200711583.png)](https://postimg.cc/nsDdNfvJ)

To implement this architecture for creating a microservice on Spring Boot that connects to a MySQL database, follow the steps below:

## Step 1: Package Structure

Select the package `ma.emsi.clientservice` and create the following sub-packages:

### a) `ma.emsi.clientservice.entity`
This package is intended for defining the data models or entities used in the microservice.

```java
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Integer age;
}
```

### b) `ma.emsi.clientservice.repository`
Here, you will place the repositories responsible for database interactions, such as querying and updating data.

```java
@Repository
public interface ClientRepository extends JpaRepository<Client,Long> { }
```

### c) `ma.emsi.clientservice.service`
In this package, implement the services that encapsulate the business logic of the microservice. These services interact with repositories and handle the core functionality.

```java
public interface ClientService {
    List<Client> findAll();
    Client findById(Long id) throws Exception;
    void addClient(Client client);
}

/*ClientService*/

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
```

### d) `ma.emsi.clientservice.controller`
The controller package is where you define the API endpoints and handle incoming HTTP requests.

```java
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
```


### e) Test you application 



# Creation of Client Service

- Create a new project in Spring Initialzr
[![image-2023-12-07-202814248.png](https://i.postimg.cc/BZ8kw97G/image-2023-12-07-202814248.png)](https://postimg.cc/5jVs6GMP)

- Add Necessary Dependency
[![image-2023-12-07-202853186.png](https://i.postimg.cc/QNWYJgV8/image-2023-12-07-202853186.png)](https://postimg.cc/jCths7zm)

## Static Configuration (using yaml and properties file or by Java Code)

### Using application.yaml

- in the application.properties add the following lines 
```yaml
server:
  port: 8888
spring:
  application:
    name: Gateway
  cloud:
    discovery:
      enabled: false  
```
- This configuration instructs the Gateway microservice to route HTTP requests with the following URL: http://localhost:8888/api/client to the Microservice at http://localhost:8081/api/client.
```yaml
server:
  port: 8888
spring:
  application:
    name: Gateway
cloud:
  discovery:
    enabled: false  
  gateway:
      routes:
        - id: r1
          uri: http://localhost:8081
          predicates:
            - Path=/api/client/**
```
- Run the Application and Check if you can see the Client Service data on `https://localhost:8888/api/client`
[![image-2023-12-07-204056705.png](https://i.postimg.cc/Gp43MgZg/image-2023-12-07-204056705.png)](https://postimg.cc/5HMMyg98)

### Using Java Code 

- Change the application.yaml file with the following : 
```yaml
server:
  port: 8888
spring:
  application:
    name: Gateway
  cloud:
    discovery:
      enabled: true
eureka:
  instance:
    hostname: localhost
``` 
-Add in the main class the following : 
```java
@Bean
    RouteLocator routes(RouteLocatorBuilder builder){
        return builder.routes()
                .route(r->r.path("/api/client/**").uri("lb://SERVICE-CLIENT"))
                .build();
    }
```

## Dynamic Configuration

For dynamic configuration, it's simpler. We keep the same configuration as before. Just comment or remove the previous bean and replace it with a new bean as follows:

```java
    @Bean
    DiscoveryClientRouteDefinitionLocator routesDynamic(
            ReactiveDiscoveryClient reactiveDiscoveryClient,
            DiscoveryLocatorProperties discoveryLocatorProperties){
        return new DiscoveryClientRouteDefinitionLocator(reactiveDiscoveryClient,discoveryLocatorProperties);
    }
```

- Try now one `http://localhost:8888/SERVICE-CLIENT/api/client`

