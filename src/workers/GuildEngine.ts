import { readFile, stat, writeFile } from 'fs';
import { Guild, Player } from '../typeSafety/definitions';

/**
 * Performs the given action on the providend players. If no players passed, affects the whole guild
 * @param action `(Player, params) => Player` any function on the guild as a whole. 
 * @param players `string[] | undefined` set of players affected by this action. If undefined affects whole guild
 * @param params `object` anything needed to satiate the params for the action
 */
export default function (action: (p: Player, params?: object) => Player, players?: string[], params?: object): void {
	stat("./players.json", (err: NodeJS.ErrnoException) => {
		if (err) { throw new Error().stack; }
		readFile("./players.json", (readErr: NodeJS.ErrnoException, data: Buffer) => {
			const guild = <Guild>JSON.parse(data.toString());
			if (readErr) { throw new Error().stack; }

			// this sequence is actually pretty funny
			(players ? players : Object.keys(guild)).forEach(p => {
				typeof params == "string" && (<string>params).toUpperCase() == "FUCKFELDMAN" ?  // TODO, log historical members? or just leave to git history?
					(delete guild[p])
					: (guild[p] = action(guild[p], params));
			});
			writeFile("./players.json", JSON.stringify(guild), () => console.log("SHOTS FOR SYA"))
		})
	})
}