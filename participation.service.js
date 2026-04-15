const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function joinGame(userId, gameId) {
  // 1. מציאת המשחק ובדיקה שהוא קיים ובסטטוס Waiting
  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  if (!game) {
    throw new Error("Game not found");
  }

  if (game.status !== 'Waiting') {
    throw new Error("Cannot join: Game has already started or finished"); 
  }

  // 2. בדיקה אם המשתמש כבר רשום למשחק זה
  const existingParticipant = await prisma.gameParticipant.findUnique({
    where: {
      userId_gameId: {
        userId: userId,
        gameId: gameId,
      },
    },
  });

  if (existingParticipant) {
    throw new Error("User is already registered for this game"); 
  }

  // 3. רישום המשתמש לטבלת GameParticipant בתפקיד Player
  const newParticipant = await prisma.gameParticipant.create({
    data: {
      userId: userId,
      gameId: gameId,
      role: 'Player', 
    },
  });

  return newParticipant;
}

module.exports = { joinGame };