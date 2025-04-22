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

        // Count wickets
        const total_wickets = await prisma.delivery.count({
            where: {
                bowling_team: team,
                player_dismissed: {
                    not: 'NA'
                },
            },
        });

        // Count total legal balls (exclude wides and no-balls)
        const total_balls = await prisma.delivery.count({
            where: {
                bowling_team: team,
            },
        });

        const total_runs=await prisma.delivery.groupBy({
            by:['bowling_team'],
            where:{
                bowling_team:team
            },
            _sum:{
                batsman_runs:true
            }
        })
        const total_runs_scored=total_runs[0]._sum.batsman_runs || 0;
        const overs = (total_balls / 6).toFixed(1);

        const data = {
            bowling_team: team,
            total_balls,
            overs,
            runs_conceded:total_runs_scored,
            economy: (total_runs_scored / total_balls * 6).toFixed(2),
            total_wickets,
        };

        res.status(200).json(data);
    } catch (error) {
        console.error('Error in getBowlingSummary:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.get