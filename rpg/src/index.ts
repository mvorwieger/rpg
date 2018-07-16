import {NpcFactory} from './Unit/npc/NpcFactory';
import {Player} from './Unit/Player';
import {Level} from './Level';
import {MovementFactory} from './items/MovementFactory';
import {WeaponFactory} from './items/WeaponFactory';
import {ShieldFactory} from './items/ShieldFactory';
const GroupBattle = require('./Battle/GroupBattle');

function start() {
    const player = new Player(
        WeaponFactory.createBasicSwordItem(),
        MovementFactory.createBareFeetItem(),
        ShieldFactory.createNoShieldItem()
    );

    const NPC = NpcFactory.createTroll();

    const battle = new GroupBattle(player, [NPC, NPC]);
    const reward = [WeaponFactory.createFireAxeItem()];
    const level = new Level(reward, battle);

    level.startLevel();
    player.moveItemsToInventory(level.claimPrize());
    console.log(player.stats);
    player.equipItemByRef(player.items[0]);
}

start();
