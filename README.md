# final-lab-sec2-set2-nattakit-woravit
# ENGSE207 Software Architecture

## สมาชิกในกลุ่ม

67543210055-9 | ณัฐกิตต์ แก้วคำยศ   | Backend

67543210064-1 | วรวิทย์ สุวรรณ   | Frontend

---

# ภาพรวมของระบบ

### Final Lab Set 2 เป็นการพัฒนาระบบ Task Board แบบ Cloud DataBase

- การทำงานแบบแยก service

- การใช้ Nginx เป็น API Gateway

- การเปิดใช้งาน HTTPS ด้วย Self-Signed Certificate

- การจัดเก็บ log แบบ Lightweight Logging ผ่าน Log Service

- การเชื่อมต่อ Frontend กับ Backend ผ่าน HTTPS

- งานชุดนี้ ไม่มี Register และใช้เฉพาะ Seed Users ที่กำหนดไว้ในฐานข้อมูล

---

## วัตถุประสงค์

- เพื่อเรียนรู้การออกแบบระบบแบบแยกส่วน (modular architecture)

- เพื่อเข้าใจ flow การทำงานของ security (HTTPS + JWT)

- เพื่อสามารถ deploy ระบบที่ใช้งานได้จริงใน environment จำลอง

## Architecture Diagram

```
Browser / Postman
        │
        ▼
┌────────────────────────────────────────────────────────────────────────────┐
│   Docker Compose (Local Test)                                              │
│                                                                            │
│  ┌─────────────────┐  ┌──────────────────┐  ┌──────────────────────────┐   │
│  │ 🔑 Auth Svc     │  │ 📋 Task Svc       │  │ 📅 Activity Svc          │   │
│  │   :3001         │  │   :3002          │  │   :3003                  │   │
│  │                 │  │                  │  │                          │   │
│  │ • POST /register│  │ • CRUD Tasks     │  │ • POST /internal         │   │
│  │ • POST /login   │  │ • JWT Guard      │  │   (รับ event จาก services)│   │
│  │ • GET  /me      │  │ • logActivity()→ │  │ • GET /me (JWT)          │   │
│  │ • logActivity() │  │   activity-svc   │  │ • GET /all (admin)       │   │
│  └──────┬──────────┘  └────────┬─────────┘  └──────────────────────────┘   │
│         │                      │                          ▲                │
│         │  POST /internal ─────┴───────────────────────── │                │
│         │                      │                          │                │
│         ▼                      ▼                          ▼                │
│  ┌──────────────┐  ┌──────────────────────┐  ┌────────────────────────┐    │
│  │  🗄️ auth-db  │  │  🗄️ task-db           │  │  🗄️ activity-db        │    │
│  │  users table │  │  tasks table         │  │  activities table      │    │
│  │  logs table  │  │  logs table          │  │                        │    │
│  └──────────────┘  └──────────────────────┘  └────────────────────────┘    │
│                                                                            │
│  JWT_SECRET ใช้ร่วมกันทุก service                                              │
└────────────────────────────────────────────────────────────────────────────┘
```
```
Browser / Postman
        │
        │ HTTPS (Railway จัดการให้อัตโนมัติ)
        ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         Railway Project                                   │
│                                                                           │
│  Auth Service              Task Service         Activity Service          │
│  https://auth-xxx…          https://task-xxx…    https://activity-xxx…    │
│       │                          │                       ▲                │
│       │                          │  POST /internal       │                │
│       └──────────────────────────┴───────────────────────┘                │
│       │                          │                       │                │
│       ▼                          ▼                       ▼                │
│   auth-db                    task-db              activity-db             │
│   [PostgreSQL Plugin]        [PostgreSQL Plugin]  [PostgreSQL Plugin]     │
│                                                                           │
│   Frontend เรียกแต่ละ service โดยตรงผ่าน config.js                           │
└───────────────────────────────────────────────────────────────────────────┘
---
- Activity Events ที่ระบบต้องบันทึก (บังคับ)

- event_type	ส่งมาจาก	เกิดขึ้นเมื่อ

- USER_REGISTERED	auth-service	POST /register สำเร็จ

- USER_LOGIN	auth-service	POST /login สำเร็จ

- TASK_CREATED	task-service	POST /tasks สำเร็จ

- TASK_STATUS_CHANGED	task-service	PUT /tasks/:id เปลี่ยน status

- TASK_DELETED	task-service	DELETE /tasks/:id

```

## โครงสร้าง Repository

```
final-lab-sec2-set2-[student1]-[student2]/
├── README.md
├── TEAM_SPLIT.md
├── INDIVIDUAL_REPORT_[studentid].md
├── docker-compose.yml
├── .env.example
│
├── auth-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── init.sql                    
│   └── src/
│       ├── index.js
│       ├── db/db.js
│       ├── middleware/jwtUtils.js
│       └── routes/auth.js         
│
├── task-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── init.sql              
│   └── src/
│       ├── index.js
│       ├── db/db.js
│       ├── middleware/authMiddleware.js
│       ├── middleware/jwtUtils.js
│       └── routes/tasks.js       
│
├── activity-service/               
│   ├── Dockerfile
│   ├── package.json
│   ├── init.sql                    
│   └── src/
│       ├── index.js
│       └── routes/activity.js
│
├── frontend/
│   ├── index.html
│   ├── activity.html             
│   └── config.js                   
│
└── screenshots/
├── 01_railway_dashboard.png         
├── 02_auth_register_cloud.png       
├── 03_auth_login_cloud.png           
├── 04_auth_me_cloud.png             
├── 05_activity_me_user_events.png   
├── 06_activity_task_created.png     
├── 07_activity_status_changed.png    
├── 08_task_list_cloud.png           
├── 09_protected_401.png             
├── 10_member_activity_all_403.png    
├── 11_admin_activity_all_200.png    
├── 12_readme_architecture.png        

```

---

## เปิดใช้งานผ่าน Browser

- Frontend: https://localhost
- Log Dashboard: https://localhost/logs.html

# การแบ่งงานของทีม
## TEAM_SPLIT.md
[TEAM_SPLIT.md](TEAM_SPLIT.md)

## INDIVIDUAL_REPORT_Nattakit
[INDIVIDUAL_REPORT_67543210055-9.md](INDIVIDUAL_REPORT_67543210055-9.md)
 ## INDIVIDUAL_REPORT_Woravit
[INDIVIDUAL_REPORT_67543210064-1.md](INDIVIDUAL_REPORT_67543210064-1.md)

