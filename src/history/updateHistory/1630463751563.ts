//@ts-nocheck
import { bonus, dkpDecay, plusXBoss } from './workers/actions';
import GuildEngine from './workers/GuildEngine';
import { Player } from './private/parts';

const pArray: string[] = "Qdog,Jehuty,Frehelthcare,Maydaymalone,Mylittlepwny,Phillistine,Sulla,Kerzun,Cheezeitz,Bigwinner,Laverin,Boilingbull,Incarnáte,Ancientgring,Syagria,Tavodlech,Coasty,Featherwind,Cescgabriel,Nótt,Druwuidd,Halcion,Maximumtaco,Attisal,Ifail,".split(',').filter(i => i.trim());
GuildEngine(plusXBoss, { players: pArray, params: { bosses: 2 } })