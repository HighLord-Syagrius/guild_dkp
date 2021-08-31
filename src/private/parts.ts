/*
	These shall be the basic objects for guild DKP management.
*/
export interface Abbrev {
	[key: string]: {
		last_update: string;
		total: number;
	}

}

export interface Guild {
	[key: string]: Player;
}

export interface PlayerDetails {
	name: string
	runningTotal: number;
	history: RaidDay[];
	ranking: Ranking;
}

export enum Ranking {
	IS_A_CUNT,		// immutable
	SHIT_TIER,	 	// immutable
	STANDARD,		// mutable
	DECENT,			// mutable
	OFFICER,		// mutable
	FAVORED_OF_SYA, // immutable; reserved for Hateless
	GOD_TIER        // immutable; reserved for Sya
}

interface RaidDay {  // will make sense later; if you are reading this top-down
	date: number;
	changeValue: number[];
	comments?: string;
}

export const oneDayInMillis: number = 8640000;
export const bossMultiplier: number = 25;

export class Player implements PlayerDetails {
	name: string;
	ranking: Ranking;
	history: RaidDay[];
	runningTotal: number;

	constructor(details: PlayerDetails, firstRaid?: RaidDay) {
		const { history, name, ranking, runningTotal } = details;
		this.ranking = ranking || Ranking.STANDARD;
		this.history = history || [];
		this.runningTotal = runningTotal || 0;
		if (firstRaid) {
			this.history = [<RaidDay>firstRaid];
		}
	}

	// actual methods on this class
	public dkpEvent(date: number, amount: number, comment?: string): Player {
		const eventInd = this.history.findIndex(hist => hist.date == date - date % oneDayInMillis);
		if (eventInd != -1) {
			const event = this.history[eventInd];
			event && event.changeValue.push(amount);
			this.runningTotal += amount;
			comment && event && event.comments ? (event.comments += "\n" + comment) : (event && (event.comments = comment));
		} else {
			this.history.push({ changeValue: [amount], date: date - date % oneDayInMillis, comments: comment })
			this.history.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
		}
		return this;
	}

	// can't return PlayerDetails unless we override Stringify.
	public static playerReport(): string {
		return JSON.stringify(this);
	}
	public static newPlayer(name: string): Player {
		return new Player({ name: name, ranking: Ranking.SHIT_TIER, history: [], runningTotal: 0 });
	}
}

export class DecentPlayer extends Player {
	public constructor(details: PlayerDetails, firstRaid?: RaidDay) {
		super(details, firstRaid);
		this.ranking = Ranking.DECENT;
	}
	// unique methods TBD
}
export class CorePlayer extends Player { }

export class Officer extends Player {
	public constructor(details: PlayerDetails, firstRaid?: RaidDay) {
		super(details, firstRaid);
		this.ranking = Ranking.OFFICER;
	}
	// unique methods TBD
}

export class GodTierPlayer extends Player {
	public constructor(details: PlayerDetails, firstRaid?: RaidDay) {
		super(details, firstRaid);
		this.ranking = Ranking.GOD_TIER;
	}
	public static amIGod(): void {
		console.log("YES")
	}
}



export class BetterDate extends Date {
	addDays(days: number): Date {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	}
}