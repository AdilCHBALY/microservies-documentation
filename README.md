
## Microservice Architecture Workshop

This repository contains the necessary resources for the hands-on workshop aimed at developing a deep understanding of microservice architecture. The main objectives of this learning experience include creating and registering microservices, connecting to MySQL database, establishing a microservice Gateway, and implementing synchronous communication between microservices using the OPENFEIGN tool.

# Creation of Discovery Service Eureka

- Create a new project in Spring Initialzr
[![image-2023-12-07-193053655.png](https://i.postimg.cc/QtWpFyN7/image-2023-12-07-193053655.png)](https://postimg.cc/vgb1jXV8)
- Add Eureka Server Dependency
[![image-2023-12-07-193203126.png](https://i.postimg.cc/Fsx0kcvT/image-2023-12-07-193203126.png)](https://postimg.cc/HVVrfrVM)
- in the application.properties add the following lines 
[![image-2023-12-07-193725600.png](https://i.postimg.cc/BndtfgSY/image-2023-12-07-193725600.png)](https://postimg.cc/BjBJx21H)
- add `@EnableEurekaClient ` in main
[![image-2023-12-07-193816573.png](https://i.postimg.cc/W3V3h1J0/image-2023-12-07-193816573.png)](https://postimg.cc/67HwPwcQ)
- Run the application and Check if the project work on `https://localhost:8761`
[![image-2023-12-07-195027484.png](https://i.postimg.cc/hPxK77V6/image-2023-12-07-195027484.png)](https://postimg.cc/QHX22C4J)

# Creation of Client Service

- Create a new project in Spring Initialzr
[![image-2023-12-07-195308539.png](https://i.postimg.cc/VsCx7P5b/image-2023-12-07-195308539.png)](https://postimg.cc/t79vTf3X)
- Add Necessary Dependency
[![image-2023-12-07-195426196.png](https://i.postimg.cc/sxs49Wvm/image-2023-12-07-195426196.png)](https://postimg.cc/JDYXRG3H)
- in the application.properties add the following lines 
[![image-2023-12-07-200226644.png](https://i.postimg.cc/Bv2hT4mq/image-2023-12-07-200226644.png)](https://postimg.cc/2q8FmRpJ)
- add `@EnableDiscoveryClient ` in main
[![image-2023-12-07-195742554.png](https://i.postimg.cc/4xPym9gZ/image-2023-12-07-195742554.png)](https://postimg.cc/SnXkPjRt)
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

[![image-2023-12-07-201243672.png](https://i.postimg.cc/8PMchYh1/image-2023-12-07-201243672.png)](https://postimg.cc/SJQm4DT5)

### b) `ma.emsi.clientservice.repository`
Here, you will place the repositories responsible for database interactions, such as querying and updating data.

[![image-2023-12-07-201346394.png](https://i.postimg.cc/hPpw3D8M/image-2023-12-07-201346394.png)](https://postimg.cc/9rwJDjnq)

### c) `ma.emsi.clientservice.service`
In this package, implement the services that encapsulate the business logic of the microservice. These services interact with repositories and handle the core functionality.

[![image-2023-12-07-201806735.png](https://i.postimg.cc/C1ckpQvy/image-2023-12-07-201806735.png)](https://postimg.cc/MMjvyd2t)

### d) `ma.emsi.clientservice.controller`
The controller package is where you define the API endpoints and handle incoming HTTP requests.

[![image-2023-12-07-202134074.png](https://i.postimg.cc/GhwGwGKm/image-2023-12-07-202134074.png)](https://postimg.cc/dD6LG7gb)


### e) Test you application 



# Creation of Client Service

- Create a new project in Spring Initialzr
[![image-2023-12-07-202814248.png](https://i.postimg.cc/BZ8kw97G/image-2023-12-07-202814248.png)](https://postimg.cc/5jVs6GMP)

- Add Necessary Dependency
[![image-2023-12-07-202853186.png](https://i.postimg.cc/QNWYJgV8/image-2023-12-07-202853186.png)](https://postimg.cc/jCths7zm)

## Static Configuration (using yaml and properties file or by Java Code)

### Using application.yaml

- in the application.properties add the following lines 
[![image-2023-12-07-203346255.png](https://i.postimg.cc/wT1qVGLt/image-2023-12-07-203346255.png)](https://postimg.cc/fJhQW5HZ)
- This configuration instructs the Gateway microservice to route HTTP requests with the following URL: http://localhost:8888/api/client to the Microservice at http://localhost:8081/api/client.
[![image-2023-12-07-203812270.png](https://i.postimg.cc/3JY6r4J3/image-2023-12-07-203812270.png)](https://postimg.cc/jC3vZj71)
- Run the Application and Check if you can see the Client Service data on `https://localhost:8888/api/client`
[![image-2023-12-07-204056705.png](https://i.postimg.cc/Gp43MgZg/image-2023-12-07-204056705.png)](https://postimg.cc/5HMMyg98)

### Using Java Code 

- Change the application.yaml file with the following :  
[![image-2023-12-07-204518928.png](https://i.postimg.cc/Bv2QFYkr/image-2023-12-07-204518928.png)](https://postimg.cc/mc2sfwbj)
-Add in the main class the following : 
[![image-2023-12-07-211353306.png](https://i.postimg.cc/hPP3kX06/image-2023-12-07-211353306.png)](https://postimg.cc/ThF9mYFJ)

## Dynamic Configuration

For dynamic configuration, it's simpler. We keep the same configuration as before. Just comment or remove the previous bean and replace it with a new bean as follows:

[![image-2023-12-07-212218294.png](https://i.postimg.cc/XYvqBkkL/image-2023-12-07-212218294.png)](https://postimg.cc/Vd3m3MT0)

- Try now one `http://localhost:8888/SERVICE-CLIENT/api/client`

