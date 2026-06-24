package pl.servicetrack;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "pl.servicetrack")
public class InvoiceServiceApp {

    public static void main(String[] args) {
        SpringApplication.run(InvoiceServiceApp.class, args);
    }
}