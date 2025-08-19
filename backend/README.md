# Spring Boot Backend (Maven)

## Prerequisites
- Java 17 or later installed
- Maven installed (`mvn` command available)

## Building the Backend

From the `backend` directory, run:

```sh
mvn clean install
```

This will compile the code, run tests, and package the application.

## Running the Backend

To start the Spring Boot application, run:

```sh
mvn spring-boot:run
```

Or, to run the packaged JAR (after building):

```sh
java -jar target/*.jar
```

## Notes
- All Gradle files have been removed. The project is now fully Maven-based.
- If you need to add dependencies, edit the `pom.xml` file.
- For more information, see the [Spring Boot Maven Plugin documentation](https://docs.spring.io/spring-boot/docs/current/maven-plugin/reference/html/).
