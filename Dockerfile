# משתמשים באימג' רשמי של Node.js
FROM node:18

# הגדרת תיקיית העבודה בתוך הקונטיינר
WORKDIR /app

# העתקת קבצי הגדרות החבילות
COPY package*.json ./

# התקנת התלויות
RUN npm install

# העתקת כל שאר קבצי הפרויקט (כולל תיקיית prisma)
COPY . .

# יצירת ה-Prisma Client בתוך הקונטיינר
# RUN npx prisma generate
# הגדרת משתנה סביבה כדי לעקוף את בעיית האישור בגלל הסינון
# ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# הרצת הפקודה
# RUN npx prisma generate
# הפקודה שתרוץ כשהקונטיינר יעלה (נשתמש ב-Compose כדי לדייק אותה)
# CMD ["node", "main.js"]
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npx prisma generate

CMD ["sh", "-c", "npx prisma migrate deploy && node main.js"]