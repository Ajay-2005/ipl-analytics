const fs=require('fs');
const csv=require('csv-parser');
const { PrismaClient } = require('../generated/prisma');
console.log(PrismaClient);  
const prisma = new PrismaClient();  

const path = require('path');

async function ImportMatches(){
    const results = [];
    fs.createReadStream(path.join(__dirname, '../matches.csv'))
    .pipe(csv())
    .on('data', async (data) => {
        results.push({
            id: parseInt(data.id),
            season: parseInt(data.season),
            city: data.city || null,
            date: new Date(data.date),
            match_type: data.match_type || null,
            player_of_match: data.player_of_match || null,
            venue: data.venue || null,
            team1: data.team1,
            team2: data.team2,
            toss_winner: data.toss_winner,
            toss_decision: data.toss_decision,
            winner: data.winner || null,
            result: data.result || null,
            result_margin: data.result_margin || null,
            target_runs: data.target_runs ? parseInt(data.target_runs) : null,
            target_overs: data.target_overs ? parseFloat(data.target_overs) : null,
            super_over: data.super_over.toLowerCase() === 'true',
            method: data.method || null,
            umpire1: data.umpire1 || null,
            umpire2: data.umpire2 || null,
          });
    })
    .on('end', async () => {
        for (const match of results) {
            await prisma.match.create({
                data: match,
            });
        }
        console.log('Matches imported successfully!');
        await prisma.$disconnect();
    })
    .on('error', (error) => {
        console.error('Error reading CSV file:', error);
    });
} 
async function ImportDeliveries(){
    const deliveries = [];
    fs.createReadStream(path.join(__dirname, '../deliveries.csv'))
    .pipe(csv())
    .on('data', (row) => {
        deliveries.push({
          match_id: parseInt(row.match_id),
          inning: parseInt(row.inning),
          batting_team: row.batting_team,
          bowling_team: row.bowling_team,
          over: parseInt(row.over),
          ball: parseInt(row.ball),
          batter: row.batter,
          bowler: row.bowler,
          non_striker: row.non_striker,
          batsman_runs: parseInt(row.batsman_runs),
          extra_runs: parseInt(row.extra_runs),
          total_runs: parseInt(row.total_runs),
          extras_type: row.extras_type || null,
          is_wicket: row.is_wicket === '1',
          player_dismissed: row.player_dismissed || null,
          dismissal_kind: row.dismissal_kind || null,
          fielder: row.fielder || null
        });
      })
    .on('end', async () => {
        for (const delivery of deliveries) {
            await prisma.delivery.create({
                data: delivery,
            });
        }
        console.log('Deliveries imported successfully!');
        await prisma.$disconnect();
    })
    .on('error', (error) => {
        console.error('Error reading CSV file:', error);
    });
}
// Run both functions one after the other
async function runImports() {
    await ImportMatches();
    await ImportDeliveries();
  }
  
runImports();
  