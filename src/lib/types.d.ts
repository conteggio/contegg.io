import type { Game, Play, Player } from '@prisma/client';

export type PlayCount = {
	_count: {
		plays: number;
	};
};

export type PlayerCount = {
	_count: {
		players: number;
	};
};

export type View = 'table' | 'cards';

export type GameForTableView = Game & PlayCount;
export type PlayForTableView = Play &
	PlayerCount & {
		game: Game;
		players: PlayerPlay[] & {
			player: Player;
		};
	};
export type PlayerForTableView = Player & PlayCount;

export type ListItem = GameForTableView | PlayerForTableView;

export type RightDrawerContent =
	| 'edit-player'
	| 'edit-game'
	| 'edit-play'
	| 'edit-player-play'
	| null;
