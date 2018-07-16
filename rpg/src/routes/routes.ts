import {Player} from '../Unit/Player';
import {WeaponFactory} from '../items/WeaponFactory';
import {MovementFactory} from '../items/MovementFactory';
import {NpcFactory} from '../Unit/npc/NpcFactory';
import {ShieldFactory} from '../items/ShieldFactory';
import {Level} from '../Level';
import {Battle} from '../Battle/Battle';

var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/json
app.use(bodyParser.json())

// Get Player Information info
app.get('/me',function (req, res) {
    res.send("get me")
})

// Create Player Route
app.post('/me', function (req, res) {
    const player = new Player(
        WeaponFactory.createNoWeapon(),
        MovementFactory.createBareFeetItem(),
        ShieldFactory.createNoShieldItem()
    );
    res.send(JSON.stringify(player.stats))
});

app.get('/me/items', function (req, res) {
    const player = new Player(
        WeaponFactory.createNoWeapon(),
        MovementFactory.createBareFeetItem(),
        ShieldFactory.createNoShieldItem()
    );
    player.moveItemsToInventory([WeaponFactory.createFireAxeItem(), WeaponFactory.createBasicSwordItem()]);
    res.send(JSON.stringify(player.items))
});

/**function start() {


    const NPC = NpcFactory.createTroll();
    NPC.health = 1;

    const battle = new Battle(player, NPC);
    const reward = [WeaponFactory.createFireAxeItem()];
    const level = new Level(reward, battle);

    level.startLevel();
    player.moveItemsToInventory(level.claimPrize());
    console.log(player.stats);
    player.equipItemByRef(player.items[0]);
}
**/


app.listen(8000, function () {
    console.log('Server started')
})
