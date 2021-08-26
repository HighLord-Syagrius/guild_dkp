/*

		________  ___  ___  ________  _________  ________          
	   |\   ____\|\  \|\  \|\   __  \|\___   ___\\   ____\         
	   \ \  \___|\ \  \\\  \ \  \|\  \|___ \  \_\ \  \___|_        
		\ \_____  \ \   __  \ \  \\\  \   \ \  \ \ \_____  \       
		 \|____|\  \ \  \ \  \ \  \\\  \   \ \  \ \|____|\  \      
		   ____\_\  \ \__\ \__\ \_______\   \ \__\  ____\_\  \     
		  |\_________\|__|\|__|\|_______|    \|__| |\_________\    
		  \|_________|                             \|_________|    
																   
																   
		________ ________  ________                                
	   |\  _____\\   __  \|\   __  \                               
	   \ \  \__/\ \  \|\  \ \  \|\  \                              
		\ \   __\\ \  \\\  \ \   _  _\                             
		 \ \  \_| \ \  \\\  \ \  \\  \|                            
		  \ \__\   \ \_______\ \__\\ _\                            
		   \|__|    \|_______|\|__|\|__|                           
																   
																   
																   
		________       ___    ___ ________                         
	   |\   ____\     |\  \  /  /|\   __  \                        
	   \ \  \___|_    \ \  \/  / | \  \|\  \                       
		\ \_____  \    \ \    / / \ \   __  \                      
		 \|____|\  \    \/  /  /   \ \  \ \  \                     
		   ____\_\  \ __/  / /      \ \__\ \__\                    
		  |\_________\\___/ /        \|__|\|__|                    
		  \|_________\|___|/                                   

		  
	These shall be the basic definitions for guild DKP management.
*/

import { readFile, writeFile, stat, read } from "fs";

export interface Guild {
	[key: string]: Player;
}

interface RaidDay {
	date: number;
	changeValue: number[];
	comments?: string;
}

enum Ranking {
	IS_A_CUNT,		// immutable
	STANDARD,		// mutable
	DECENT,			// mutable
	OFFICER,		// mutable
	FAVORED_OF_SYA, // immutable; reserved for Hateless
	GOD_TIER        // immutable; reserved for Sya
}


export interface PlayerDetails {
	name: string
	runningTotal: number;
	history: RaidDay[];
	ranking: Ranking;
}

const oneDayInMillis: number = 8640000;
const bossMultiplier: number = 25;
export class Player implements PlayerDetails {
	name: string;
	ranking: Ranking;
	history: RaidDay[];
	runningTotal: number;

	constructor(details: PlayerDetails, firstRaid?: RaidDay) {
		const { history, name, ranking, runningTotal } = details;
		this.name = name.trim() || "SCUMMY SLUT";
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
			event.changeValue.push(amount);
			comment && event.comments ? (event.comments += comment) : (event.comments = comment);
		} else {
			this.history.push({ changeValue: [amount], date: date, comments: comment })
			this.history.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
		}
		return this;
	}

	public raidDay(bosses: number, dayOffset?: number): Player {
		const date = new BetterDate().addDays(dayOffset || 0).valueOf();
		return this.dkpEvent(date, bosses * bossMultiplier, `Standard Raid. Bosses: ${bosses}`);
	}

	// can't return PlayerDetails unless we override Stringify.
	public static playerReport(): string {
		return JSON.stringify(this);
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


/*
	we will save all players info as a .json file, which we will then parse for manipulation then then overwrite it thereafter so we can keep it on git.

	For non-developers who see this -- this is what we refer to in the vernacular as "lazy programming".
*/

export function initRoster(players: string): Guild {
	stat("./players.json", (err: NodeJS.ErrnoException) => {
		if (err) { throw new Error().stack; }
		readFile("./players.json", (readErr: NodeJS.ErrnoException, data: Buffer) => {
			if (readErr) { throw new Error().stack; }
			const guild = <Guild>JSON.parse(data.toString());
		})
	})

	return {}; // TODO fix this
}
class BetterDate extends Date {
	addDays(days: number): Date {
		var date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	}
}