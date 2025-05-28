FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app

COPY . .
RUN mvn clean install -DskipTests -pl user-service/user-web -am

FROM openjdk:17-jdk-alpine

RUN addgroup -S servicetrack \
    && adduser -S servicetrack -G servicetrack
USER servicetrack:servicetrack
COPY --from=build /app/user-service/user-web/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]