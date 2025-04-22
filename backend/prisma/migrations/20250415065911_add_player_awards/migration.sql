-- CreateTable
CREATE TABLE "PlayerAward" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "player" TEXT NOT NULL,
    "team" TEXT NOT NULL,

    CONSTRAINT "PlayerAward_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerAward_matchId_key" ON "PlayerAward"("matchId");

-- AddForeignKey
ALTER TABLE "PlayerAward" ADD CONSTRAINT "PlayerAward_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
