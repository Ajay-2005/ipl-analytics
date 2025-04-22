const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function normalizePlayerAwards() {
    try {
        const matches = await prisma.match.findMany({
            where: {
                player_of_match: {
                    not: null,
                },
            },
            select: {
                id: true,
                team1: true,
                team2: true,
                player_of_match: true,
                season: true

            }
        });
        for (const match of matches) {
            const { id: matchId, team1, team2, player_of_match, season } = match
            const playerAppearance = await prisma.delivery.findFirst({
                where: {
                    AND: [
                        { match_id: matchId },
                        {
                            OR: [
                                { batter: player_of_match },
                                { bowler: player_of_match },
                                { non_striker: player_of_match },
                            ],
                        },
                    ],
                },
                select: {
                    batting_team: true,
                    bowling_team: true,
                    batter: true,
                    non_striker: true,
                    bowler: true
                }
            });
            if (!playerAppearance) {
                console.log(`No player appearance found for ${player_of_match} in match ${matchId}`);
                continue;
            }
            let team = ""
            if (playerAppearance.batter == player_of_match || playerAppearance.non_striker == player_of_match) {
                team = playerAppearance.batting_team;
            }
            else {
                team = playerAppearance.bowling_team;
            }
            await prisma.playerAward.create({
                data: {
                    matchId,
                    season,
                    player: player_of_match,
                    team,

                },
            });
            console.log(`Saved award for ${player_of_match} in match ${matchId}`);
        }
        console.log("Player awards normalized!");
    }
    catch (error) {
        console.error("Error normalizing player awards:", error);

    }

}
normalizePlayerAwards()