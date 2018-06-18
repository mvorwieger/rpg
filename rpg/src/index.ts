import {RideHorse} from './move/RideHorse';
import {Axe} from './attack/Axe';
import {NpcFactory} from './npc/NpcFactory';
import {Battle} from './Battle';
import {Player} from './Player';
import {Shield} from './defence/Shield';
import {Level} from './Level';
import {Item} from './Item';
import {FireAxe} from './items/Axes/FireAxe';

function start() {
    const PLAYER = new Player(new RideHorse(), new Axe(), new Shield(10, 15));
    const NPC = NpcFactory.createTroll();
    NPC.health = 1;

    const battle = new Battle(PLAYER, NPC);
    const item = FireAxe;
    const reward = [item];
    const level = new Level(reward, battle);

    level.startLevel();
    PLAYER.collectRewards(level.claimPrize());
    console.log(PLAYER.items);
    PLAYER.equipItem(PLAYER.items[0].name);
}

start();
