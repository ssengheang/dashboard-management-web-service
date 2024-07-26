# dashboard-management-web-service

Follow This Steps In Order To Run App Successful

1. Install deps:
```bash
npm install
```
2. Check .env.example file and follow what been told 
3. Migrate database run:
```bash
npx sequelize-cli db:migrate
```
4. Run seed:
```bash
npx sequelize-cli db:seed:all
```
5. Run project: 
```bash
npm start
```
6. Done

Note: All APIs have set specific permission conditions that identify what user can do based on their role. To avoid any unauthorized actions when requesting a specific API, just use an admin user (Provided in .env file), as this user can do anything.
