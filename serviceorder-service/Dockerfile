FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app

COPY . .
RUN mvn clean install -DskipTests -pl serviceorder-service/serviceorder-web -am

FROM eclipse-temurin:17-jre-alpine

RUN addgroup -S servicetrack \
    && adduser -S servicetrack -G servicetrack
USER servicetrack:servicetrack
COPY --from=build /app/serviceorder-service/serviceorder-web/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]