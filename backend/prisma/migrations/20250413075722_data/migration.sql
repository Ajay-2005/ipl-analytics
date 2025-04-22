-- CreateTable
CREATE TABLE "Match" (
    "id" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,
    "city" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "match_type" TEXT,
    "player_of_match" TEXT,
    "venue" TEXT,
    "team1" TEXT NOT NULL,
    "team2" TEXT NOT NULL,
    "toss_winner" TEXT NOT NULL,
    "toss_decision" TEXT NOT NULL,
    "winner" TEXT,
    "result" TEXT,
    "result_margin" TEXT,
    "target_runs" INTEGER,
    "target_overs" DOUBLE PRECISION,
    "super_over" BOOLEAN NOT NULL,
    "method" TEXT,
    "umpire1" TEXT,
    "umpire2" TEXT,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "match_id" INTEGER NOT NULL,
    "inning" INTEGER NOT NULL,
    "batting_team" TEXT NOT NULL,
    "bowling_team" TEXT NOT NULL,
    "over" INTEGER NOT NULL,
    "ball" INTEGER NOT NULL,
    "batter" TEXT NOT NULL,
    "bowler" TEXT NOT NULL,
    "non_striker" TEXT NOT NULL,
    "batsman_runs" INTEGER NOT NULL,
    "extra_runs" INTEGER NOT NULL,
    "total_runs" INTEGER NOT NULL,
    "extras_type" TEXT,
    "is_wicket" BOOLEAN NOT NULL,
    "player_dismissed" TEXT,
    "dismissal_kind" TEXT,
    "fielder" TEXT,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
