# Game Join Service - Task

פרויקט Backend קטן הממחיש שירות הצטרפות למשחק באמצעות **Node.js**, **Prisma** ו-**PostgreSQL**, כשהכל ארוז בתוך **Docker**.

## דרישות מערכת
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) מותקן ופועל.

## מבנה הפרויקט
- **main.js**: נקודת הכניסה לאפליקציה, מאתחלת נתונים ומריצה את הלוגיקה.
- **matchmaking.service.js**: הלוגיקה העסקית (ולידציות, בדיקת סטטוס משחק ומניעת כפילויות).
- **prisma/schema.prisma**: הגדרת מודל הנתונים.
- **Dockerfile & docker-compose.yml**: הגדרות הסביבה להרצה אוטומטית.

## הוראות הרצה
כדי להריץ את הפרויקט בצורה אוטומטית לחלוטין, יש לפתוח טרמינל בתיקיית הפרויקט ולהריץ:

```bash
docker-compose up --build