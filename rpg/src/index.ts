import {RideHorse} from './move/RideHorse';
import {Axe} from './attack/Axe';
import {NpcFactory} from './npc/NpcFactory';
import {Battle} from './Battle';
import {Player} from './Player';
import {Shield} from './defence/Shield';
import {Level} from './Level';
import {Item} from './Item';

function start() {
    const PLAYER = new Player(new RideHorse(), new Axe(), new Shield(10, 15));
    const NPC = NpcFactory.createTroll();
    NPC.health = 200;

    const battle = new Battle(PLAYER, NPC);
    const item = new Item('common', 322, 'Axe', new Axe());
    const reward = [item];
    const level = new Level(reward, battle);

    level.startLevel();
    console.dir(battle.battleLog, {depth: null})
    PLAYER.collectRewards(level.claimPrize());
    console.log(PLAYER.items);
}

    start();
