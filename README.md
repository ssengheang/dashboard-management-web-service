# dashboard-management-web-service

Follow This Steps In Order To Run App Successful

1. ```Install deps: npm install```
2. Check .env.example file and follow what been told 
3. Migrate database run: npx sequelize-cli db:migrate 
4. Run seed: npx sequelize-cli db:seed:all
5. Run project: npm start
6. Done

Note: All APIs have set specific permission conditions that identify what user can do based on their role. To avoid any unauthorized actions when requesting a specific API, just use an admin user (Provided in .env file), as this user can do anything.
