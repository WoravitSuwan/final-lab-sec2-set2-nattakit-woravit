# TEAM_SPLIT.md

## ข้อมูลกลุ่ม
- กลุ่มที่: [Sec2-3]
- รายวิชา: ENGSE207 Software Architecture

## รายชื่อสมาชิก
- [67543210055-9] [ณัฐกิตต์-แก้วคำยศ]
- [67543210064-1] [วรวิทย์-สุวรรณ]

---

## การแบ่งงานหลัก

### สมาชิกคนที่ 1: [ณัฐกิตต์-แก้วคำยศ]
รับผิดชอบงานหลัก: Backend, Security & Infrastructure Engineer
- Backend & API Development: Microservices Architecture: ออกแบบและพัฒนาโครงสร้างพื้นฐานของระบบโดยแบ่งเป็น Auth Service (จัดการผู้ใช้งาน) และ Task Service (จัดการข้อมูลงาน)

- Authentication & Authorization: วางระบบความปลอดภัยด้วย JWT (JSON Web Token) และการกำหนดสิทธิ์เข้าถึงข้อมูล

- API Integration: พัฒนาส่วนเชื่อมต่อเพื่อรองรับการทำงานร่วมกับ Frontend ผ่านโปรโตคอล HTTPS และจัดการระบบการจัดเก็บ Token ในฝั่ง Client อย่างปลอดภัย

- Testing: รับผิดชอบการทดสอบ API ทั้งหมดผ่าน Postman และ Curl

### สมาชิกคนที่ 2: [วรวิทย์-สุวรรณ]
รับผิดชอบงานหลัก: Frontend & Integration DeveloperFrontend Development & User Experience
- Frontend Development: พัฒนาส่วนแสดงผลผู้ใช้งาน (User Interface) ด้วย React/Vue ในโฟลเดอร์ frontend

- Database & Logging: ออกแบบและจัดการฐานข้อมูล PostgreSQL และพัฒนาระบบ Log Service เพื่อบันทึกเหตุการณ์สำคัญ (Audit Logs)

- Responsive UI Development: พัฒนาส่วนแสดงผลผู้ใช้งาน (User Interface) ภายในโฟลเดอร์ frontend โดยเน้นความง่ายในการใช้งานและการตอบสนองที่รวดเร็ว

- Data Modeling: ออกแบบและบริหารจัดการโครงสร้างฐานข้อมูล PostgreSQL เพื่อรองรับความสัมพันธ์ของข้อมูลที่ซับซ้อนในระบบ Microservices

- Full-stack Integration: เชื่อมต่อระบบ Frontend เข้ากับ Backend Services (Auth & Task) ผ่านการเรียกใช้ API และจัดการข้อมูลที่ส่งกลับมาจาก Server

## งานที่ดำเนินการร่วมกัน
- ออกแบบ architecture diagram
- ทดสอบAPIผ่าน postman
- จัดทำ README และ screenshots
- Database & Log
- UI ความสวยงามหน้าเว็บ

## เหตุผลในการแบ่งงาน
การแบ่งงานตามความเชี่ยวชาญและความสามารถที่ตนเองถนัด ในส่วนที่ไม่ถนัดจะนำมาช่วยกันแก้ไข

ซึ่งถือว่าแบ่งงานกันได้อย่างดีเยี่ยมเพราะถนัดต่างกันอย่างชัดเจน Backend/Frontend

## สรุปการเชื่อมโยงงานของสมาชิก
1. การกำหนดมาตรฐาน API และระบบความปลอดภัย (API & Security Protocol)
Backend Strategy: นายณัฐกิตต์ออกแบบ API Endpoints และโครงสร้าง JSON Schema (เช่น Task/Log Models) พร้อมวางระบบรักษาความปลอดภัยด้วย HTTPS และ JWT Authentication

Frontend Implementation: นายวรวิทย์รับช่วงต่อในการทำ API Mapping เพื่อให้การรับ-ส่งข้อมูลฝั่ง Client สอดคล้องกับโครงสร้างที่กำหนด หากมีการเปลี่ยนแปลง Schema ในฐานข้อมูล ทั้งคู่จะทำการ Refactor โค้ดร่วมกันเพื่อป้องกันระบบล่ม (System Breakdown)

2. วงจรการจัดการสิทธิ์เข้าใช้งาน (Authentication Life Cycle)
Token Generation: เมื่อมีการ Login ผ่าน Auth Service ระบบฝั่ง Backend จะทำการออก JWT Token ที่ผ่านการเข้ารหัส

Client-side Handling: ฝั่ง Frontend ดำเนินการจัดเก็บ Token ใน localStorage และเขียน Logic สำหรับการแนบ Token ลงใน HTTP Authorization Header ทุกครั้งที่มีการเรียกใช้งาน Task หรือ Log Services เพื่อยืนยันตัวตนตามมาตรฐานความปลอดภัย

3. การบูรณาการข้อมูลและการบันทึกกิจกรรม (Data Flow & Observability)
Event Triggering: เมื่อผู้ใช้สั่งการผ่านหน้า UI (เช่น การสร้าง Task) ระบบ Frontend จะส่ง Request ไปยัง Backend เพื่อบันทึกข้อมูล และกระตุ้นให้ Log Service ทำการบันทึก Audit Logs โดยอัตโนมัติ



4. การทดสอบระบบร่วมกัน (Integrated End-to-End Testing)
Synchronization: ทั้งสองประสานงานกันในขั้นตอนสุดท้ายเพื่อตรวจสอบความสอดคล้องระหว่างข้อมูลในฐานข้อมูลและการแสดงผลบนหน้าจอ

Error Resilience: มีการตกลงเรื่อง Error Handling Strategies เช่น หาก Backend มีการจำกัด Rate Limit หรือพบข้อผิดพลาด 401/403 ฝั่ง Frontend จะต้องมี Logic ในการแสดงผล Error Messages หรือแจ้งเตือนผู้ใช้งานได้อย่างเหมาะสม

### จุดประสานงานที่สำคัญ (Key Collaboration Points)
API Specification: การจัดทำเอกสารข้อตกลงเรื่อง URL Path และรูปแบบ JSON Objects เพื่อลดความซ้ำซ้อน

Environment Configuration: การบริหารจัดการไฟล์ .env ร่วมกัน เพื่อให้การเชื่อมต่อผ่าน Nginx และ Docker Network ภายในมีความถูกต้อง

Response Standards: การกำหนด HTTP Status Codes 

# การแบ่งงานของทีม
## TEAM_SPLIT.md
[TEAM_SPLIT.md](TEAM_SPLIT.md)

## INDIVIDUAL_REPORT_Nattakit
[INDIVIDUAL_REPORT_67543210055-9.md](INDIVIDUAL_REPORT_67543210055-9.md)
 ## INDIVIDUAL_REPORT_Woravit
[INDIVIDUAL_REPORT_67543210064-1.md](INDIVIDUAL_REPORT_67543210064-1.md)
