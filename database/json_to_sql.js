json.map(row=>"  INSERT INTO cities (\"cityName\", count) VALUES ('"+row.cityName+"', "+row.count+");").join('')