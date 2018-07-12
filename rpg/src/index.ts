import {NpcFactory} from './Unit/npc/NpcFactory';
import {Battle} from './Battle/Battle';
import {Player} from './Unit/Player';
import {Level} from './Level';
import {MovementFactory} from './items/MovementFactory';
import {WeaponFactory} from './items/WeaponFactory';
import {ShieldFactory} from './items/ShieldFactory';

function start() {
    const PLAYER = new Player(
        WeaponFactory.createBasicSwordItem(),
        MovementFactory.createBareFeetItem(),
        ShieldFactory.createNoShieldItem()
    );

    const NPC = NpcFactory.createTroll();
    NPC.health = 1;

    const battle = new Battle(PLAYER, NPC);
    const reward = [WeaponFactory.createFireAxeItem()];
    const level = new Level(reward, battle);

    level.startLevel();
    PLAYER.moveItemsToInventory(level.claimPrize());
    console.log(PLAYER.stats);
    PLAYER.equipItemByRef(PLAYER.items[0]);
}

start();
