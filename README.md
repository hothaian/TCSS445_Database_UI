## An Ho | uwid: 2277119
## Tin Phu | uwid: ?
# TCSS 445 - WINTER 2024- FINAL PROJECT

## Description

We are developing Online Shop Manager Web Manager.

Highlights include efficient data handling, backend APIs for database management, and an Analytical Sales Dashboard for sales visualization. 

 Github Repository: [https://github.com/phuhuutin/TCSS445_Database_UI.git](https://github.com/phuhuutin/TCSS445_Database_UI.git)

## Features


- **Database Management:** MySQL database with  for migrations and data handling.


- **Additional Web Services:**
  - **MySQL Database Management:** Provides APIs for efficient management and manipulation of MySQL database records.
  - **Analytical Sales Dashboard:** Employs data analytics for visualizing sales metrics and trends.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Folder Structure](#folder-structure)



## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js:** Install Node.js from [nodejs.org](https://nodejs.org/).

2. **MySQL Workbench:** Install MySQL Workbench from [dev.mysql.com](https://dev.mysql.com/downloads/workbench/).

3. **Local Database:**
   - Open MySQL Workbench and connect to your local MySQL server.
   - Using given querry TinPhu_AnHo_queries.sql  to install the data in mySQL


   Note: Ensure that your MySQL server is running before attempting to create the database.

4. **Backend Configuration:**
  - Update file `db.config.js` in folder `backend/config` with your MySQL database credentials.
     ``` 
      module.exports = {
          HOST: "localhost",
          USER: "root",
          PASSWORD: "123456",
          DB: "phu_tin_and_ho_an"
        };
     ```
  - Replace `roor` and `123456` with your MySQL server credentials.
  - Navigate to the `backend` folder  and install dependencies
 
      ```
     cd backend
     npm install
     ```
5. **Frontend and Backend Dependencies:**
 - Open second Terminal, Navigate to the `frontend` folder  and install dependencies
 
      ```
     cd frontend
     npm install
     ```
Now your project is set up with the necessary prerequisites. 


## Getting Started

Follow the steps below to set up and run your project locally.

### Backend

**Sync Local MySQL Database:**
   - Make sure your local MySQL server is running.
   - Navigate to the `backend` folder.
   - Run the following command to synchronize your local MySQL database:
     ```
     npm start
     ```
   - This will establish a connection to your local MySQL server and sync the database.


### Frontend

1. **Start Frontend Development Server:**
- Navigate to the `frontend` folder.
- Start the development server:
  ```bash
  npm start
  ```

2. **Access the App:**
   - Open your web browser and visit [http://localhost:3000](http://localhost:3000).
   - You should see your React app running locally.

Now your project's backend is synchronized with the local MySQL database:
- Frontend is accessible at [http://localhost:3000](http://localhost:3000)
- backend is accessible at [http://localhost:8080](http://localhost:8080)



## Folder Structure

Briefly describe the purpose of each major folder in your project.

```plaintext
project-root/
│
├── backend/
│   ├── config/
│   ├── controllers/│   
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── package.json  
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    |   ├── index.css
    │   ├── route.js
    |   ├── theme.css    
    ├── package.json
└── README.md