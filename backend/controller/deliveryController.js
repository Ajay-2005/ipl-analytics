const e = require("express");
const { PrismaClient } = require("../generated/prisma")
const prisma = new PrismaClient();

exports.getBattingSummary = async (req, res) => {
    const { team } = req.params;
    const battingstats = await prisma.delivery.groupBy({
        by: ['batting_team'],
        where: {
            batting_team: team,
        },
        _sum: {
            batsman_runs: true
        },
        _count: {
            _all: true
        }
    })
    const dotballs = await prisma.delivery.groupBy({
        by: ['batting_team'],
        where: {
            batting_team: team,
            batsman_runs: 0
        },
        _count: {
            _all: true
        }
    })
    const boundaries = await prisma.delivery.groupBy({
        by: ['batting_team'],
        where: {
            batting_team: team,
            batsman_runs: {
                gte: 4
            }

        },
        _count: {
            _all: true
        }
    })
    const dot_balls = dotballs[0]._count._all || 0;
    const stats = battingstats[0]
    const boundary = boundaries[0]._count._all || 0;
    const total_runs = stats._sum.batsman_runs || 0;
    const total_balls = stats._count._all || 0;
    const battingSummary = {
        team: team,
        total_runs,
        total_balls,
        dot_balls,
        boundary,
        strikerate: (total_runs / total_balls) * 100,
    }
    res.status(200).json(battingSummary)

}

exports.getBowlingSummary = async (req, res) => {
    try {
        const { team } = req.params;

        const total_wickets = await prisma.delivery.count({
            where: {
                bowling_team: team,
                player_dismissed: {
                    not: 'NA'
                },
            },
        });

        const total_balls = await prisma.delivery.count({
            where: {
                bowling_team: team,
            },
        });

        const total_runs = await prisma.delivery.groupBy({
            by: ['bowling_team'],
            where: {
                bowling_team: team
            },
            _sum: {
                batsman_runs: true
            }
        })
        const total_runs_scored = total_runs[0]._sum.batsman_runs || 0;
        const overs = (total_balls / 6).toFixed(1);

        const data = {
            bowling_team: team,
            total_balls,
            overs,
            runs_conceded: total_runs_scored,
            economy: (total_runs_scored / total_balls * 6).toFixed(2),
            total_wickets,
        };

        res.status(200).json(data);
    } catch (error) {
        console.error('Error in getBowlingSummary:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTopRunScorers = async (req, res) => {
    try {
        const topRunScorers = await prisma.delivery.groupBy({
            by: ['batter'], // assuming your schema uses 'batter'
            _sum: {
                batsman_runs: true
            },
            orderBy: {
                _sum: {
                    batsman_runs: 'desc'
                }
            },
            take: 10
        });

        const formattedScorers = topRunScorers.map(scorer => ({
            batsman: scorer.batter,
            total_runs: scorer._sum.batsman_runs
        }));

        res.status(200).json(formattedScorers);
    } catch (error) {
        console.error('Error fetching top run scorers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getTopWicketTakers = async (req, res) => {
    try {
        const topWicketTakers = await prisma.delivery.groupBy({
            by: ['bowler'],
            _count: {
                player_dismissed: true
            },
            orderBy: {
                _count: {
                    player_dismissed: 'desc'
                }
            },
            take: 10
        });

        const formattedWicketTakers = topWicketTakers.map(taker => ({
            bowler: taker.bowler,
            total_wickets: taker._count.player_dismissed
        }));

        res.status(200).json(formattedWicketTakers);
    } catch (error) {
        console.error('Error fetching top wicket takers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getPlayerStats = async (req, res) => {
    try {
        const { player } = req.params;

        // Batting stats
        const batting = await prisma.delivery.aggregate({
            where: { batter: player },
            _sum: { batsman_runs: true },
            _count: { id: true }
        });

        // Bowling stats
        const bowling = await prisma.delivery.aggregate({
            where: { bowler: player },
            _count: { player_dismissed: true },
            _sum: { total_runs: true } // or 'batsman_runs' + extras if you want total conceded
        });

        const total_runs = batting._sum.batsman_runs || 0;
        const total_balls = batting._count.id || 0;
        const total_wickets = bowling._count.player_dismissed || 0;
        const runs_conceded = bowling._sum.total_runs || 0;

        const playerSummary = {
            player,
            total_runs,
            total_balls,
            strike_rate: total_balls ? ((total_runs / total_balls) * 100).toFixed(2) : "0.00",
            total_wickets,
            economy: total_wickets ? ((runs_conceded / total_balls) * 6).toFixed(2) : "0.00"
        };

        res.status(200).json(playerSummary);

    } catch (error) {
        console.error('Error in getPlayerStats:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


