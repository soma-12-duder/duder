FROM openjdk:8
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=./duder.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]