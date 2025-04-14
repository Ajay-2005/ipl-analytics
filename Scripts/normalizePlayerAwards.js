const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function normalizePlayerAwards() {
    try {
        const matches = await prisma.match.findMany({
            where: {
                player_of_match: {
                    not: null,
                },
                select: {
                    id: true,
                    team1: true,
                    team2: true,
                    player_of_match: true,

                }
            }
        });
        for (const match of matches) {
            const { id: matchId, team1, team2, player_of_match } = match;
            const playerAppearance = await prisma.delivery.findFirst({
                where: {
                    match_id: matchId,
                },
                AND: {
                    OR: [
                        { batter: player_of_match },
                        { bowler: player_of_match },
                        { non_striker: player_of_match },
                    ],
                },
                select: {
                    batter: true,
                    bowler: true,
                    batting_team: true,
                    non_striker: true,
                    bowling_team: true,
                },
            });
            const team = ""
            if (playerAppearance.batter == player_of_match || playerAppearance.non_striker == player_of_match) {
                team = playerAppearance.batting_team;
            }
            else {
                team = playerAppearance.bowling_team;
            }
            await prisma.playerAward.create({
                data: {
                    matchId,
                    player,
                    team,
                },
            });
         console.log(`Saved award for ${player} in match ${matchId}`);
        }
        console.log("Player awards normalized!");
    }
    catch(error) {
        console.error("Error normalizing player awards:", error);

    }

}