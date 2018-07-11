import {NpcFactory} from './npc/NpcFactory';
import {Battle} from './Battle';
import {Player} from './Player';
import {Level} from './Level';
import {Item} from './Item';
import {FootFactory} from './items/FootFactory';
import {WeaponFactory} from './items/WeaponFactory';
import {ShieldFactory} from './items/ShieldFactory';

function start() {
    const PLAYER = new Player(
        WeaponFactory.createBasicSwordItem(),
        FootFactory.createBareFeetItem(),
        ShieldFactory.createNoShieldItem()
    );

    const NPC = NpcFactory.createTroll();
    NPC.health = 1;

    const battle = new Battle(PLAYER, NPC);
    const reward = [WeaponFactory.createFireAxeItem()];
    const level = new Level(reward, battle);

    level.startLevel();
    PLAYER.moveItemsToInventory(level.claimPrize() as Item[]);
    console.log(PLAYER.items);
    PLAYER.equipItemByRef(PLAYER.items[0]);
}

start();
