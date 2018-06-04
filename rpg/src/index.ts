import {RideHorse} from './move/RideHorse';
import {Axe} from './attack/Axe';
import {NpcFactory} from './npc/NpcFactory';
import {Battle} from './Battle';
import {Player} from './Player';

new Battle(new Player(new RideHorse(), new Axe()), NpcFactory.createTroll()).battle();
