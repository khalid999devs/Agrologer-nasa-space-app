# reference: https://pypi.org/project/climateserv/ 


import climateserv

x = 90.4126  
y = 23.8103

GeometryCoords = [[x-.01,y+.01],[x+.01, y+.01],
                  [x+.01, y-.01],[x-.01,y-.01],[x-.01,y+.01]]
                  
DatasetType = 38
OperationType = 'Average'
EarliestDate = '01/03/2023'
LatestDate = '09/16/2024'
SeasonalEnsemble = '' 
SeasonalVariable = '' 
Outfile = 'out.csv'

climateserv.api.request_data(DatasetType, OperationType, 
             EarliestDate, LatestDate,GeometryCoords, 
             SeasonalEnsemble, SeasonalVariable,Outfile)
