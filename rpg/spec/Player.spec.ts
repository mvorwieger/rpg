import "jasmine";
import {Player} from "../src/Unit/Player";
import {MovementFactory} from "../src/items/MovementFactory";
import {WeaponFactory} from "../src/items/WeaponFactory";
import {ShieldFactory} from "../src/items/ShieldFactory";
import {Wallet} from "../src/Wallet";
import {Inventory} from "../src/Inventory";

describe("Player::", function () {
    let player: Player;
    beforeEach(function () {
        player = new Player(
            WeaponFactory.createBasicSwordItem(),
            MovementFactory.createBareFeetItem(),
            ShieldFactory.createBaseShieldItem()
        )
    });

    it("exchange() should perform a money item transaction", function () {
        const exchangePartner = {
            wallet: new Wallet(),
            inventory: new Inventory()
        };

        exchangePartner.inventory.add(WeaponFactory.createFireAxeItem());
        const amount = 2000;
        const item = exchangePartner.inventory.items[0];
        const wallet = exchangePartner.wallet;

        expect(player.exchange(amount, item, wallet)).toBeFalsy();
        player.wallet.add(2000);
        expect(player.exchange(amount, item, wallet)).toBe(item);
    })
});
