#nasa power api reference https://github.com/kdmayer/nasa-power-api 

import requests
import json
from pathlib import Path

def fetch_weather_data(latitude, longitude, start_date, end_date, output_dir):
    # Construct the API URL
    url = f"https://power.larc.nasa.gov/api/temporal/daily/point?parameters=TMP_2m_MAX,TMP_2m_MIN,PRECTOT,RELHUM&community=RE&longitude={longitude}&latitude={latitude}&start={start_date}&end={end_date}&format=JSON"

    # Make the request
    response = requests.get(url)

    # Check for a successful response
    if response.status_code == 200:
        data = response.json()  # Parse the JSON data
        return data
    else:
        print("Error:", response.status_code, response.text)
        return None

def save_to_json(data, output_path):
    with open(output_path, 'w') as json_file:
        json.dump(data, json_file, indent=4)  # Save with pretty formatting

def main():
    # Define your parameters
    latitude = 23.685
    longitude = 90.3563
    start_date = "20100301"
    end_date = "20210101"
    output_dir = Path('data')
    
    # Ensure the output directory exists
    output_dir.mkdir(parents=True, exist_ok=True)

    # Fetch weather data
    weather_data = fetch_weather_data(latitude, longitude, start_date, end_date, output_dir)

    # Save the data to JSON if it's not None
    if weather_data:
        output_path = output_dir / f"{longitude};{latitude}.json"
        save_to_json(weather_data, output_path)
        print(f"Data saved to {output_path}")

if __name__ == '__main__':
    main()

