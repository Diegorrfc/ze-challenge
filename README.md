Requirements to run this project: You need to have node.js and mongodb installed

## Steps to run and build the project

## 1 - Install Dependencies;
    command: npm i

### 1.1 - Run locally;
    command: npm run start:dev 

### 1.2 - Build to deploy;
    comand: npm run build.
    The command gonna generater file to deploy at folder /dist

### 1.3 - Run Unit Test;
    command: npm run test
    
### 1.3 - Run Mutation Test;
    command: npm run test:mutation
    
## 2 Requests;

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

## Unit test report

![Screen Shot 2021-07-23 at 06 53 01](https://user-images.githubusercontent.com/11844937/126766585-6adabbf3-4b67-44cc-8ec9-123f197c3ec4.png)

## Muutation test report

### What is mutation testing?
    'Bugs, or mutants, are automatically inserted into your production code. Your tests are run for each mutant. If your tests fail then the mutant is killed. If     your tests passed, the mutant survived. The higher the percentage of mutants killed, the more effective your tests are.'    
   [stryke](https://stryker-mutator.io/docs/)

![Screen Shot 2021-07-24 at 07 55 23](https://user-images.githubusercontent.com/11844937/126866349-6d789a07-c977-4079-b462-d622e977dbc7.png)
