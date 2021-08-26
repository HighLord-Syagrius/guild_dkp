import { readFile, stat, writeFile } from 'fs';
import { Guild, Player } from '../typeSafety/definitions';

/**
 * Performs the given action on the providend players. If no players passed, affects the whole guild
 * @param action `(Player, params) => Player` any function on the guild as a whole. 
 * @param options object containing the subParams
 * @param options.players affected players; default all players if null/undef
 * @param options.params the params passed to the action
 * @param otpions.report if you want to report the new result in console. For now, at least, this will default as true
 */
export default function (
	action: (p: Player, params?: object) => Player,
	options?: { players?: string[], params?: object, report?: boolean }
): void {
	const { players, params, report } = options || {};
	try {
		stat("./players.json", (statErr: NodeJS.ErrnoException) => {
			if (statErr) { throw new Error().stack; }
			readFile("../history/players.json", (readErr: NodeJS.ErrnoException, data: Buffer) => {
				const guild = <Guild>JSON.parse(data.toString());
				if (readErr) { throw new Error().stack; }

				// this sequence is actually pretty funny
				(players ? players : Object.keys(guild)).forEach(p => {
					typeof params == "string" && (<string>params).toUpperCase() == "FUCKFELDMAN" ?  // TODO, log historical members? or just leave to git history?
						(delete guild[p])
						: (guild[p] = action(guild[p], params));
				});
				writeFile("../history/players.json", JSON.stringify(guild, null, 2), () => {
					console.log("\nSHOTS FOR SYA\n");
					!report && console.log("\n\nRESULTS====\n\n" + JSON.stringify(guild, null, 2));
				})
			})
		})
	} catch (e) {
		console.log(`[${new Date}]: ${new Error().stack}`)
	}
}