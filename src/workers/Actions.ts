import { bossMultiplier, Player } from '../typeSafety/definitions';

/**
 * Collection of "shortcut" actions to affect dkp. Contains many convenience methods
 * remember, you pass the params in the invocation of guild-action.
 */

/**
 * @decayPercent number multiple in place of the expected .9
 */
export const dkpDecay = (p: Player, decayPercent?: number): Player => {
	const ev = p.dkpEvent(new Date().valueOf(), 0, "DKP Decay");
	ev.runningTotal *= !decayPercent ? .9 : decayPercent;
	return p;
}

/**
 * @param params {number of bosses killed, date}
 */
export const plusXBoss = (p: Player, params?: { bosses: number, date?: Date; }): Player => {
	return p.dkpEvent(
		params?.date ? params.date.valueOf() : new Date().valueOf(),
		(params?.bosses || 1) * bossMultiplier,
		`Killed ${params?.bosses} Boss` + params?.bosses ? "es" : ""
	);
}

/**
 * @param params {bonus amount, date}. If nothing passed, defaults to 50dkp bonus
 */
export const bonus = (p: Player, params?: { bonus?: number, date?: Date; }): Player => {
	return p.dkpEvent(params?.date ? params.date.valueOf() : new Date().valueOf(), params?.bonus || 50, `Gracious Bonus of ${params?.bonus || 50} dkp!`);
}

// look at me following modern module practices
export default { bonus: bonus, plusXBoss: plusXBoss, dkpDecay: dkpDecay }