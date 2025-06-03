package pl.servicetrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "pl.servicetrack")
public class ServiceOrderServiceApp {

    public static void main(String[] args) {
        SpringApplication.run(ServiceOrderServiceApp.class, args);
    }
}