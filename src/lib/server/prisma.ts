import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient;

prismaClient = new PrismaClient();

const prisma = prismaClient.$extends({
	model: {
		play: {
			async findScoreboard(id: number) {
				const scoreboard = await prisma.$queryRaw`
                    select
                        *,
                        RANK () OVER ( 
                            ORDER BY score DESC
                        ) score_rank 
                    from PlayerPlay
                    where
                        playId = ${id}
                `;
				return scoreboard;
			}
		}
	}
});

export default prisma;
