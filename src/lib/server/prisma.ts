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
			async findPlayersWithScores(id: number) {
				const players: PlayerWithPlace[] = await prisma.$queryRaw`
                    select
                        pp.*,
                        p.name,
                        rank () over ( 
                            order by score desc
                        ) place
                    from PlayerPlay as pp
                    join Player as p
                    on pp.playerId = p.id
                    where playId = ${id};
                `;
				return players;
			}
		}
	}
});

export default prisma;
