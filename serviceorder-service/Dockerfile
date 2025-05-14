FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app
COPY . .
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jdk-alpine

RUN addgroup -S servicetrack \
    && adduser -S servicetrack -G servicetrack
USER servicetrack:servicetrack
ARG JAR_FILE=/app/main-web/target/*.jar
COPY --from=build ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]