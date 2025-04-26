const { PrismaClient } = require('../generated/prisma');
const { get } = require('../routes/matchRoutes');
const prisma = new PrismaClient();

exports.getMatches = async (req, res) => {
    try {
        const matches = await prisma.match.findMany();
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.getMatchesById = async (req, res) => {
    const { id } = req.params
    try {
        const matches = await prisma.match.findMany({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json(matches);
    }
    catch (error) {
        console.error('Error fetching matches by id:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.getMatchSummary = async (req, res) => {


}
exports.getAllSeasons = async (req, res) => {
    try {
        const seasons = await prisma.match.findMany({
            distinct: ['season'],
            select: {
                season: true,
            },
            orderBy: {
                season: 'asc',
            },
        })
        res.status(200).json(seasons);
    }
    catch (error) {
        console.error('Error fetching seasons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.getMatchesBySeason = async (req, res) => {
    const { season } = req.params
    try {
        const matches = await prisma.match.findMany({
            where: {
                season: parseInt(season),
            },
        });
        res.status(200).json(matches);
    }
    catch (error) {
        console.error('Error fetching matches by season:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.getMatchesByTeam = async (req, res) => {
    const { team } = req.params
    try {
        const matches = await prisma.match.findMany({
            where: {
                OR: [
                    {
                        team1: team,
                    },
                    {
                        team2: team,
                    },
                ],
            },
        });
        res.status(200).json(matches);
    }
    catch (error) {
        console.error('Error fetching matches by team:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.getTopPlayers = async (req, res) => {
    try {
        const top_players = await prisma.playerAward.groupBy({
            by: ['player'],
            _count: {
                player: true,
            },
            orderBy: {
                _count: {
                    player: 'desc',
                },
            },
            take: 10,
        });
        res.status(200).json(top_players);
    }
    catch (error) {
        console.error('Error fetching top players:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}
exports.getTopPlayersByTeam = async (req, res) => {
    const { team } = req.params
    try {
        const top_players = await prisma.playerAward.groupBy({
            where: {
                team: team
            },
            by: ['player'],
            _count: {
                player: true,
            },
            orderBy: {
                _count: {
                    player: 'desc',
                },
            },
            take: 10,
        });

        res.status(200).json(top_players);
    }
    catch (error) {
        console.error('Error fetching top players:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getTopPlayersBySeason = async (req, res) => {
    const { season } = req.params
    try {
        const top_players = await prisma.playerAward.groupBy({
            where: {
                season: parseInt(season),
            },
            by: ['player'],
            _count: {
                player: true,
            },
            orderBy: {
                _count: {
                    player: 'desc',
                },
            },
            take: 10,
        });
        res.status(200).json(top_players);
    }
    catch (error) {
        console.error('Error fetching top players:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getTopPlayersBySeasonAndTeam = async (req, res) => {
    const { season, team } = req.params;

    // Convert season to a number
    const seasonNumber = parseInt(season, 10);

    // Validate the seasonNumber
    if (isNaN(seasonNumber)) {
        return res.status(400).json({ error: 'Invalid season parameter' });
    }

    try {
        const top_players = await prisma.playerAward.groupBy({
            by: ['player'],
            where: {
                season: seasonNumber,
                team: team,
            },
            _count: {
                player: true,
            },
            orderBy: {
                _count: {
                    player: 'desc',
                },
            },
            take: 10,
        });

        res.json(top_players);
    } catch (error) {
        console.error('Error fetching top players:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllTeams = async (req, res) => {
    try {
        // Assuming you have a `season` field in your `Match` model
        const currentSeason = 2023; // Replace with logic to get the current season or last season

        const team1List = await prisma.match.findMany({
            where: { season: currentSeason },
            distinct: ['team1'],
            select: {
                team1: true
            }
        });

        const team2List = await prisma.match.findMany({
            where: { season: currentSeason },
            distinct: ['team2'],
            select: {
                team2: true
            }
        });

        const allTeamsSet = new Set([...team1List.map(match => match.team1), ...team2List.map(match => match.team2)]);
        const allTeams = Array.from(allTeamsSet).sort();

        res.status(200).json(allTeams);

    }
    catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.getTeamStats = async (req, res) => {
    try {
        const { team } = req.params
        const total_matches = await prisma.match.count(
            {
                where: {
                    OR: [
                        {
                            team1: team
                        },
                        {
                            team2: team
                        }
                    ]
                }
            }
        )
        const win_matches = await prisma.match.count(
            {
                where: {
                    AND: [
                        {
                            OR: [
                                {
                                    team1: team
                                },
                                {
                                    team2: team
                                }
                            ]
                        },
                        {
                            winner: team
                        }
                    ]
                }
            }
        )
        const title_wons = await prisma.match.count(
            {
                where: {
                    AND: [
                        {
                            OR: [
                                {
                                    team1: team
                                },
                                {
                                    team2: team
                                }
                            ]
                        },
                        {
                            winner: team
                        },
                        {
                            match_type: "Final"
                        }
                    ]
                }

            }
        )
        const final_appearance = await prisma.match.count(
            {
                where: {
                    AND: [
                        {
                            OR: [
                                {
                                    team1: team
                                },
                                {
                                    team2: team
                                }
                            ]
                        },

                        {
                            match_type: "Final"
                        }
                    ]
                }

            }
        )

        const lost_matches = total_matches - win_matches;
        const winpercentage = (win_matches / total_matches) * 100;
        const data = {
            team: team,
            total_matches: total_matches,
            win_matches: win_matches,
            lost_matches: lost_matches,
            win_percentage: winpercentage,
            title_wons: title_wons,
            final_appearance: final_appearance,
        }
        res.status(200).json(data)
    }
    catch (error) {
        console.error('Error in fetching stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}
exports.getHeadToHeadStats = async (req, res) => {
    try {
        const { team1, team2 } = req.params;

        // Fetching the matches between the two teams
        const matches = await prisma.match.findMany({
            where: {
                OR: [
                    { team1: team1, team2: team2 },
                    { team1: team2, team2: team1 }
                ]
            }
        });

        // Calculate stats
        const total_matches = matches.length;
        const winTeam1 = matches.filter(match => match.winner === team1).length;
        const winTeam2 = matches.filter(match => match.winner === team2).length;
        const tossWin = matches.filter(match => match.toss_winner === team1).length;
        const tossWin2 = matches.filter(match => match.toss_winner === team2).length;

        // Fetch top run scorer (batting performance)
        const topRunScore = await prisma.delivery.groupBy({
            by: ['batter'],
            where: {
                match_id: { in: matches.map(match => match.id) }
            },
            _sum: { batsman_runs: true },
            orderBy: { _sum: { batsman_runs: 'desc' } },
            take: 3
        });

        // Extract the top run scorer and their total runs
        const topRunScorer = topRunScore[0] ? {
            player: topRunScore[0].batter,
            runs: topRunScore[0]._sum.batsman_runs
        } : null;

        // Fetch top bowler (bowling performance)
        const topBowler = await prisma.delivery.groupBy({
            by: ['bowler'],
            where: {
                match_id: { in: matches.map(match => match.id) },
                is_wicket: true
            },
            _count: { is_wicket: true },
            orderBy: { _count: { is_wicket: 'desc' } },
            take: 3
        });

        const topBowling = topBowler[0] ? {
            player: topBowler[0].bowler,
            wickets: topBowler[0]._count.is_wicket
        } : null;

        const data = {
            team1: team1,
            team2: team2,
            totalMatches: total_matches,
            team1_win: winTeam1,
            team2_win: winTeam2,
            team1_tossWin: tossWin,
            team2_tossWin: tossWin2,
            topRunScorer,
            topBowler: topBowling
        };

        res.status(200).json(data);
    } catch (error) {
        console.error("Error in fetching Head to head stats: ", error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
};

