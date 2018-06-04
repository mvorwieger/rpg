import {RideHorse} from './move/RideHorse';
import {Axe} from './attack/Axe';
import {NpcFactory} from './npc/NpcFactory';
import {Battle} from './Battle';
import {Player} from './Player';

const PLAYER = new Player(new RideHorse(), new Axe());
const NPC = NpcFactory.createTroll();
NPC.health = 200;

const battle = new Battle(PLAYER, NPC);
battle.battle();
