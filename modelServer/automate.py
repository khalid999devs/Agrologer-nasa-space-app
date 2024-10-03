import os
import time
import subprocess
from app.services.predictions_dashboard import predict_and_store

# Paths
NasaDataPath = 'nasa_data'  
TrainModelsScript = 'train_models.py'  

def check_for_new_data():
    new_data_files = []

    for filename in os.listdir(NasaDataPath):
        file_path = os.path.join(NasaDataPath, filename)
        if filename.endswith('.csv') or filename.endswith('.raw'):
            new_data_files.append(file_path)

    return new_data_files

def run_training_script(raw_data_path=None, processed_data_path=None):
    command = f'python {TrainModelsScript}'
    if raw_data_path:
        command += f' --raw_data_path {raw_data_path}'
    if processed_data_path:
        command += f' --processed_data_path {processed_data_path}'

    subprocess.run(command, shell=True)

if __name__ == "__main__":
    processed_data = None
    raw_data = None
    while True:
        new_data_files = check_for_new_data()
        
        for file in new_data_files:
            if file.endswith('.csv'):
                processed_data = file
            elif file.endswith('.raw'):
                raw_data = file
            
            run_training_script(raw_data_path=raw_data, processed_data_path=processed_data)
            predict_and_store()

        time.sleep(60)  # Check every minute
