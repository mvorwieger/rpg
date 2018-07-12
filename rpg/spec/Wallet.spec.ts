import "jasmine";
import {Wallet} from "../src/Wallet";

describe("Wallet::", () => {
    let wallet: Wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it('add() should add towards my wallet', function () {
        wallet.add(50);
        expect(wallet.money).toBe(50);
    });

    it('sub() should subtract money from my wallet if there is any', function () {
        wallet.add(100);
        wallet.sub(50);
        expect(wallet.money).toBe(50);
    });

    it('sub() should throw and error if there is no money to subtract', function () {
        expect(wallet.sub(60)).toBeFalsy();
        wallet.add(20);
        expect(wallet.sub(20)).toBeTruthy();
    });

    it('pay() should remove the amount and add it to the given wallet', function () {
        const wallet2 = new Wallet();
        wallet.add(20);
        wallet.pay(20, wallet2);

        expect(wallet.money).toBe(0);
        expect(wallet2.money).toBe(20);
    });
});