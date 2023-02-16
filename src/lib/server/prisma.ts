import { PrismaClient, type PlayerPlay } from '@prisma/client';

export type PlayerWithPlace = PlayerPlay & {
  place: number
  name: string
}

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
          count: string
        }
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
		}
	}
});

export default prisma;
