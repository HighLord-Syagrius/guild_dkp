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

	Pull-requests welcome. Feel free-to further delineate roles.
*/
 
import { readFile, writeFile, stat, read } from "fs";

export interface Guild {
	[key: string]: Player;
}

interface FirstRaid {
	attendanceDate: string;
	dkpEarned: number;
}

enum Ranking {
	STANDARD,		// mutable
	DECENT,			// mutable
	OFFICER,		// mutable
	FAVORED_OF_SYA, // reserved for Hateless
	GOD_TIER        // reserved for Sya
}

export class Player {
	dkp: number = 0;
	lastAttendance: string = ""; // formatting as java.time.dateformatter passing "MM/dd/yyyy"
	lastExpense: string = "";
	dkpHistory: number[] = [];
	attendanceHistory: string[] = []; // array of type specified in lastAttendance
	ranking: Ranking = Ranking.STANDARD;

	constructor(firstRaid?: FirstRaid) {
		if (firstRaid) {
			const { attendanceDate, dkpEarned } = firstRaid;
			this.lastAttendance = attendanceDate;
			this.dkpHistory = [dkpEarned];
		}
	}

	// actual methods on this class
	latestAttendance(date: string) {
		if (this.attendanceHistory[this.attendanceHistory.length - 1] !== date) {
			this.attendanceHistory.push(date);
		}
	}

	earnDKP(dkpGranted: number, date: string): void {
		this.latestAttendance(date);
		this.dkp += dkpGranted;
		this.dkpHistory.push(dkpGranted);
		if (this.attendanceHistory[this.attendanceHistory.length - 1] !== date) {
			this.attendanceHistory.push(date);
		}
	}

	spendDKP(dkpEaten: number, date: string): void {
		this.latestAttendance(date);
		this.lastExpense = date;
		this.dkp -= dkpEaten;
		if (this.attendanceHistory[this.attendanceHistory.length - 1] !== date) {
			this.dkpHistory[this.dkpHistory.length - 1] -= dkpEaten;
		} else {
			this.dkpHistory.push(dkpEaten);
		}
	}
}

export class DecentPlayer extends Player {
	ranking = Ranking.DECENT;
	constructor(firstRaid?: FirstRaid) {
		super(firstRaid);
	}
	// unique methods TBD
}
export class CorePlayer extends Player { }

export class Officer extends Player {
	ranking = Ranking.OFFICER;
	constructor(firstRaid?: FirstRaid) {
		super(firstRaid)
	}
	// unique methods TBD
}

export class GodTierPlayer extends Player {
	ranking = Ranking.GOD_TIER;
	constructor(firstRaid?: FirstRaid) {
		super(firstRaid);
	}
	// bitch. get off my lawn
}


/*
	we will save all players info as a .json file, which we will then parse for manipulation then then overwrite it thereafter so we can keep it on git.

	For non-developers who see this -- this is what we refer to in the vernacular as "lazy programming".
*/

export function initRoster(players: string): Player[] {
	stat("./players.json", (err: NodeJS.ErrnoException) => {
		!err && readFile("./players.json", (readErr: NodeJS.ErrnoException, data: Buffer) => {
			if (!readErr) {
				const playerArr = <Player[]>JSON.parse(data.toString());
			}
		})
	})
	return [];
}
