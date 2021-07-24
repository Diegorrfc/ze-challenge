Requirements to run this project: You need to have node.js and mongodb installed

## Steps to run and build the project

## 1 - Install Dependencies;
    comand: npm i

### 1.1 - Run locally;
    comand: npm run start:dev 

### 1.2 - Build to deploy;
    comand: npm run build.
    The comand gonna generater file to deploy at folder /dist

### 1.3 - Run Unit Test;
    comand: npm run test

## 2 Requets;

### 2.1 Create a partner: 
        method: post, link; http://localhost:5050/partners 
      ```json
      {
        "id": "1", 
        "tradingName": "Adega da Cerveja - Pinheiros",
        "ownerName": "Zé da Silva",
        "document": "1432132123891/0001",
        "coverageArea": { 
          "type": "MultiPolygon", 
          "coordinates": [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
          ]
        },
        "address": { 
          "type": "Point",
          "coordinates": [-46.57421, -21.785741]
        }
      }
      ```

### 2.2 Load partner by id: 
        method: get, link; http://localhost:5050/partners/:id

### 2.3 Search partner:
        method: get, link; http://localhost:5050/partners?longitude=-180&latitude=-70


Note: The uri for date base is at main/config/db-connection.ts 

Unit test report

![Screen Shot 2021-07-23 at 06 53 01](https://user-images.githubusercontent.com/11844937/126766585-6adabbf3-4b67-44cc-8ec9-123f197c3ec4.png)