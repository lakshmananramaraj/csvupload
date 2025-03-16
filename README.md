Step to run: 

1. Install pm2 globally
   
   `npm install -g pm2`

2. Install dependencies

   `npm install`

3. Provide mongoDB url in server.js & /controller/worker.js

4. To start the server

   `pm2 start server.js --name csvupload`

5. To stop the server
   
   `pm2 stop csvupload`

API's 

1. Upload Api - http://localhost:3000/api/upload
   
   formData
   req - { file: "fileObj"}
   res - { message: "File uploaded successfully" }

2. Search Api - http://localhost:3000/api/search/username
    
   req:{}
   res - { user: { .... }, policy: { ... } }

3. All policy with user - http://localhost:3000/api/allpolicies

   req:{}
   res - { user: { .... }, policy: { ... }, policycarriers: { ... }, policycategories: { ... } }

Task 2:

4. Schedule Message - http://localhost:3000/api/schedulemessage

   req:{ message: "Message scheduled at 4:30", day: "2025-03-15", time: "16:30" }
   res- { message: "Message scheduled successfully" } 


