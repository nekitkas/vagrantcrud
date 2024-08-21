### Setup with vagrant

In order to be able to run the project, you need to have the following installed on your machine:

- [Vagrant](https://www.vagrantup.com/)
- [VirtualBox](https://www.virtualbox.org/)

To launch the application, follow these steps:
```
cp .env.example .env
```
This will create a new `.env` file in the root of the project. Fill the password fields with password of you choose.

Install vagrant env plugin:
```
vagrant plugin install vagrant-env
```
Run ``` vagrant up ``` to start the virtual machines. 

It might take a while to set up the environment. To speed up the process, open 3 terminals and run ``` vagrant up BillingVM```, ``` vagrant up InventoryVM``` ``` vagrant up GatewayVM```


### Setup with docker compose

In order to be able to run the project, you need to have the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

```
cp .env.example .env
```
This will create a new `.env` file in the root of the project. Fill the password fields with password of you choose.

Run ``` docker-compose up -d ``` to start the containers.

To interact with application, you can use the following tools, or any other equivalent:

- [Postman](https://www.getpostman.com/) - for API requests
- [DBeaver](https://dbeaver.io/) - for database management
  
Interact with application using Postman or any other tool. The API docs available at http://localhost:8080/api-docs for docker-compose and http://[GATEWAY_IP]:8080/api-docs for vagrant.


### Clean up

To stop the application, run ``` vagrant halt ``` for vagrant or ``` docker-compose down ``` for docker-compose.

Clean up scripts for docker compose available in scripts folder.