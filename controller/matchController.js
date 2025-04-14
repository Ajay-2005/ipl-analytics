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
        const top_players = await prisma.match.groupBy({
            by: ['player_of_match'],
            _count: {
                player_of_match: true,
            },
            orderBy: {
                _count: {
                    player_of_match: 'desc',
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
        const top_players = await prisma.match.groupBy({
            where: {
                winner: team,
                OR: [
                    {
                        team1: team,
                    },
                    {
                        team2: team,
                    },
                ],
            },
            by: ['player_of_match'],
            _count: {
                player_of_match: true,
            },
            orderBy: {
                _count: {
                    player_of_match: 'desc',
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
        const top_players = await prisma.match.groupBy({
            where: {
                season: parseInt(season),
            },
            by: ['player_of_match'],
            _count: {
                player_of_match: true,
            },
            orderBy: {
                _count: {
                    player_of_match: 'desc',
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
    const { season, team } = req.params
    try {
        const top_players = await prisma.match.groupBy({
            where: {
                season: parseInt(season),
                OR: [
                    {
                        team1: team,
                    },
                    {
                        team2: team,
                    },
                ],
            },
            by: ['player_of_match'],
            _count: {
                player_of_match: true,
            },
            orderBy: {
                _count: {
                    player_of_match: 'desc',
                },
            },
            take: 10,
        });
        const filtered_topPlayersByTeam = top_players.filter()
        res.status(200).json(top_players);
    }
    catch (error) {
        console.error('Error fetching top players:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}