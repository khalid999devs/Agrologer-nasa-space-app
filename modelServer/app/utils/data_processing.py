import csv
import json

def csv_to_json(csv_file_path):
    with open(csv_file_path, mode='r') as file:
        reader = csv.DictReader(file)
        return json.dumps([row for row in reader])

def json_to_csv(json_data, csv_file_path):
    data = json.loads(json_data)
    with open(csv_file_path, mode='w') as file:
        writer = csv.DictWriter(file, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
