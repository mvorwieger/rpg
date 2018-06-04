import {RideHorse} from './move/RideHorse';
import {Axe} from './attack/Axe';
import {NpcFactory} from './npc/NpcFactory';
import {Battle} from './Battle';
import {Player} from './Player';
import {Shield} from './defence/Shield';

const PLAYER = new Player(new RideHorse(), new Axe(), new Shield(10, 15));
const NPC = NpcFactory.createTroll();
NPC.health = 1;

const battle = new Battle(PLAYER, NPC, [new Axe()]);
battle.battle();

PLAYER.collectRewards(battle.claimPrize());
console.log(PLAYER.inventory);
