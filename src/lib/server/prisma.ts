import { PrismaClient, type PlayerPlay } from '@prisma/client';

export type PlayerWithPlace = PlayerPlay & {
	place: number;
	name: string;
};

let prismaClient: PrismaClient;

prismaClient = new PrismaClient();

const prisma = prismaClient.$extends({
	model: {
		play: {
			async findPlayersWithScores(playId: number): Promise<PlayerWithPlace[]> {
				const players: PlayerWithPlace[] = await prisma.$queryRaw`
          select
            pp.*,
            p.name,
            dense_rank () over ( 
              order by score desc
            ) place
          from PlayerPlay as pp
          join Player as p
          on pp.playerId = p.id
          where playId = ${playId};
        `;
				return players;
			},
			async getPlayerWins(playerId: number) {
				type Res = {
					count: string;
				};
				const wins = await prisma.$queryRaw<Res[]>`
          select count(*) as count
          from (
            select
              pp.playId,
              pp.score,
              p.id as playerId,
              dense_rank () over ( 
                partition by playId
                order by score desc
              ) as place
            from PlayerPlay as pp
            join Player as p
            on pp.playerId = p.id
            where playId in (
              select playId
              from PlayerPlay
              where playerId = ${playerId}
            )
          ) ScoreSummary
          where playerId = ${playerId} and place = 1
        `;
				return Number(wins[0].count);
			}
		},
		player: {
			async getWinRates(playerId: number) {
				return await prisma.$queryRaw`
          SELECT
            g.name AS game_name,
            COUNT(*) AS total_games,
            SUM(CASE WHEN pp.score = (SELECT MAX(score) FROM PlayerPlay WHERE playId = pp.playId) THEN 1 ELSE 0 END) AS total_wins,
            ROUND(SUM(CASE WHEN pp.score = (SELECT MAX(score) FROM PlayerPlay WHERE playId = pp.playId) THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS win_rate,
            AVG(pp.score) AS avg_score,
            MAX(pp.score) AS personal_best,
            MIN(pp.score) AS personal_worst,
            COUNT(*) FILTER (WHERE rank = 1) AS first_place,
            COUNT(*) FILTER (WHERE rank = 2) AS second_place,
            COUNT(*) FILTER (WHERE rank = 3) AS third_place,
            COUNT(*) FILTER (WHERE rank > 3) AS other_place
          FROM
            Player p
            JOIN PlayerPlay pp ON p.id = pp.playerId
            JOIN Play pl ON pp.playId = pl.id
            JOIN Game g ON pl.gameId = g.id
            JOIN (
              SELECT
                playId,
                playerId,
                RANK() OVER (PARTITION BY playId ORDER BY score DESC) AS rank
              FROM
                PlayerPlay
            ) ranks ON ranks.playId = pp.playId AND ranks.playerId = pp.playerId
          WHERE
            p.id = ${playerId}
          GROUP BY
            g.name
        `;
			}
		}
	}
});

export default prisma;
