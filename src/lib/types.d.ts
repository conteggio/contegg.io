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

namespace BoardGameStats {
	export type PlayerMetadata = {
		bgaUsername: string;
		yucataUsername: string;
		isNpc: number;
	};

	export type Player = {
		uuid: string;
		id: number;
		name: string;
		isAnonymous: boolean;
		modificationDate: string;
		bggUsername: string;
		metaData: object;
	};

	export type Location = {
		uuid: string;
		id: number;
		name: string;
		modificationDate: string;
	};

	export type GameCopyMetadata = {
		PricePaidCurrency: string;
		PricePaid: string;
		AcquisitionDate: string;
		AcquiredFrom: string;
		PrivateComment: string;
		InventoryDate: string;
		InventoryLocation: string;
		VersionPublishers: string;
		VersionLanguages: string;
		FieldsAllowedToPost: string[];
		VersionEmptiedInApp: number;
	};

	export type GameCopy = {
		uuid: string;
		modificationDate: string;
		metaData: string;
		bggCollId: number;
		statusOwned: boolean;
		statusWishlist: boolean;
		statusWantToPlay: boolean;
		statusWantInTrade: boolean;
		statusForTrade: boolean;
		statusPrevOwned: boolean;
		statusPreordered: boolean;
		statusWantToBuy: boolean;
		wishlistStatus: number;
		versionName: string;
		bggVersionId: number;
		gameName: string;
		year: number;
		urlImage: string;
		urlThumb: string;
	};

	export type GameMetadata = {
		GameHasManualProperties: number;
		CollectionHistory: object;
	};

	export type Game = {
		uuid: string;
		id: number;
		name: string;
		modificationDate: string;
		cooperative: boolean;
		highestWins: boolean;
		noPoints: boolean;
		usesTeams: boolean;
		urlThumb: string;
		urlImage: string;
		bggName: string;
		bggYear: number;
		bggId: number;
		designers: string;
		metaData: string;
		isBaseGame: number;
		isExpansion: number;
		rating: number;
		minPlayerCount: number;
		maxPlayerCount: number;
		minPlayTime: number;
		maxPlayTime: number;
		minAge: number;
		preferredImage: number;
		copies: GameCopy[];
	};

	export type PlayerScore = {
		score: string;
		winner: boolean;
		newPlayer: boolean;
		startPlayer: boolean;
		playerRefId: number;
		rank: number;
		seatOrder: number;
	};

	export type PlayMetadata = {
		playUsedGameCopy: number;
		playGameCopyUuid: string;
	};

	export type Play = {
		uuid: string;
		modificationDate: string;
		entryDate: string;
		playDate: string;
		usesTeams: boolean;
		durationMin: number;
		ignored: boolean;
		manualWinner: boolean;
		rounds: number;
		bggId: number;
		importPlayId: number;
		locationRefId: number;
		gameRefId: number;
		comments: string;
		rating: number;
		nemestatsId: number;
		scoringSetting: number;
		metaData: string;
		playerScores: PlayerScore[];
		expansionPlays: any[];
	};

	export type FileContent = {
		tags: object[];
		groups: object[];
		players: Player[];
		locations: Location[];
		games: Game[];
		plays: Play[];
		challenges: object[];
		userInfo: {
			meRefId: number;
		};
	};
}
