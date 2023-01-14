import prisma from '$lib/server/prisma';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
 
export const actions: Actions = {
  default: async ({ request}) => {
    const data = await request.formData();
    const name = data.get('name')?.toString()
    const description = data.get('description')?.toString()

    if (!name) {
        return fail(400, { name, missing: true });
    }

    const newGame = await prisma.game.create({
        data: {
          name,
          description,
        },
      })
      
    return {
        res: newGame
    }
      
  }
};