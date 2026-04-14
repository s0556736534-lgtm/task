const { PrismaClient } = require('@prisma/client');
const { joinGame } = require('./game.service'); // ייבוא הפונקציה שכתבנו

const prisma = new PrismaClient();

async function main() {
  try {
    // 1. התחברות למסד הנתונים [cite: 25]
    await prisma.$connect();
    console.log("Connected to the database.");

    // 2. יצירת נתוני דמי (Seed) [cite: 26]
    // יוצרים משתמש חדש
    const user = await prisma.user.create({
      data: {} // לפי הסכמה הבסיסית שהגדרנו
    });

    // יוצרים משחק חדש בסטטוס Waiting
    const game = await prisma.game.create({
      data: {
        status: 'Waiting'
      }
    });

    console.log(`Created User (ID: ${user.id}) and Game (ID: ${game.id})`);

    // 3. קריאה לפונקציה joinGame עם הנתונים שנוצרו [cite: 27]
    await joinGame(user.id, game.id);

    // 4. הדפסת הודעת הצלחה [cite: 28]
    console.log("Success: User joined game");

  } catch (error) {
    // הדפסת הודעת שגיאה אם הפעולה נכשלה [cite: 29]
    console.error("Error:", error.message);
  } finally {
    // סגירת החיבור למסד הנתונים בסיום
    await prisma.$disconnect();
  }
}

// הרצת הסקריפט
main();