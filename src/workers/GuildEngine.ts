import { readFile, stat, writeFile, rename, copyFile, write } from 'fs';
import { Guild, Player, Abbrev, PlayerDetails } from '../private/parts';

/**
 * Performs the given action on the providend players. If no players passed, affects the whole guild
 * @param action `(Player, params) => Player` any function on the guild as a whole. 
 * @param options object containing the subParams
 * @param options.players affected players; default all players if null/undef
 * @param options.params the params passed to the action
 * @param otpions.report if you want to report the new result in console. For now, at least, this will default as true
 */
const { log } = console;
export default function (
	action: (p: Player, params?: object) => Player,
	options?: { players?: string[], params?: object, report?: boolean }
): void {
	const { players, params, report } = options || {};
	try {
		readFile("./history/readable.json", (readAbbrevErr: NodeJS.ErrnoException, abbrevData: Buffer) => {
			const abbrev: Abbrev = readAbbrevErr ? {} : <Abbrev>JSON.parse(abbrevData.toString());
			stat("./history/players.json", (statErr: NodeJS.ErrnoException) => {
				if (statErr) { throw statErr + "\n" + new Error().stack; }
				readFile("./history/players.json", (readErr: NodeJS.ErrnoException, data: Buffer) => {
					const guild = <Guild>JSON.parse(data.toString());
					if (readErr) { throw readErr + "\n" + new Error().stack; }

					// this sequence is actually pretty funny
					(players ? players : Object.keys(guild)).forEach(p => {
						if (!guild[p]) { guild[p] = Player.newPlayer(p); } else {
							guild[p] = new Player(<PlayerDetails>guild[p])
						}
						typeof params == "string" && (<string>params).toUpperCase() == "FUCKFELDMAN" ?  // TODO, log historical members? or just leave to git history?
							(delete guild[p])
							: (guild[p] = action(<Player>guild[p], params));
						abbrev[p] = { total: (guild[p] as Player).runningTotal, last_update: new Date().toDateString() };
					});
					writeFile("./history/players.json", JSON.stringify(guild, null, 2), () => {
						log("\nSHOTS FOR SYA\n");
						report && log("\n\n====RESULTS====\n\n" + JSON.stringify(guild, null, 2));
						rename("./index.ts", `./history/updateHistory/${new Date().valueOf()}.ts`, () => {
							copyFile("./private/endeavors.ts", "./index.ts", () => {
								log("Template Primed for Next Go");
								writeFile("./history/readable.json", JSON.stringify(abbrev, null, 2), () => {
									log("readable JSON written!");
								});
							});
						});
					});
				});
			});
		});
	} catch (e) {
		log(`[${new Date}]: ${new Error().stack}`);
	}
}