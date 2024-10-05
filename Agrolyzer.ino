
#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"

// Pin definitions
#define DHT11PIN 34
#define MOISTURE_PIN 4
#define PH_PIN 32

#define S1 12
#define S2 13
#define S3 14

#define R 18
#define G 19
#define B 21

DHT dht(DHT11PIN, DHT11);

// Configuring Wi-Fi
const char* ssid = "AIUB Student Wi-Fi";  
const char* password = "";  

// Server URL where we send real-time data
const char* serverName = "https://chemapi.chemgenie.app/test";  

// Global variables for sensor data
float temperature, humidity, moisture, ph;
int uid = 1;
int did = 1;

// Function to map float values
float mapfloat(long x, long in_min, long in_max, long out_min, long out_max) {
  return (float)(x - in_min) * (out_max - out_min) / (float)(in_max - in_min) + out_min;
}

// Function to get tuned moisture data
float moisture_tuned_data(int pin) {
  float analog_value = analogRead(pin);
  float moisture_percent = mapfloat(analog_value, 3194, 1970, 0, 100);
  delay(1000);
  return moisture_percent;
}

// Function to get tuned pH data
float ph_tuned_data(int pin) {
  float analog_value = analogRead(pin);
  if (analog_value < 3500) {
    float ph = mapfloat(analog_value, 3500, 1600, 14.00, 7.00);
    delay(1000);
    return ph;
  }
  return 0;  // Return 0 if analog_value is out of range
}

void setup() {
  Serial.begin(115200);

  pinMode(S1, INPUT);
  pinMode(S2, INPUT);
  pinMode(S3, INPUT);
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);

  dht.begin();
  WiFi.begin(ssid, password);
  
  // Wait for the connection
  while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Connecting to WiFi...");
  }
  
  Serial.println("Connected to WiFi");
}

void loop() {
  // Get sensor data when S2 is pressed
  if (digitalRead(S2) == HIGH) {
    digitalWrite(R, HIGH);
    digitalWrite(B, LOW);
    digitalWrite(G, LOW);

    humidity = dht.readHumidity();
    temperature = dht.readTemperature();
    moisture = moisture_tuned_data(MOISTURE_PIN);
    ph = ph_tuned_data(PH_PIN);

    digitalWrite(R, LOW);
    digitalWrite(B, HIGH);
    digitalWrite(G, LOW);
    delay(5000);
    
    sendData();

    digitalWrite(R, LOW);
    digitalWrite(B, LOW);
    digitalWrite(G, HIGH);
  }
}

void sendData() {
  if (WiFi.status() == WL_CONNECTED) {
    // Create an HTTP client
    HTTPClient http;

    // Construct the URL with query parameters
    String url = String(serverName) + 
                 "?temperature=" + temperature +
                 "&ph=" + ph +
                 "&moisture=" + moisture +
                 "&humidity=" + humidity +
                 "&uid=" + uid +
                 "&did=" + did;
    
    // Send the GET request
    http.begin(url);
    int httpResponseCode = http.GET();
    
    // Check the response code
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response: " + response);
    } else {
      Serial.print("Error on sending GET: ");
      Serial.println(httpResponseCode);
    }
    
    // Close the connection
    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
}
