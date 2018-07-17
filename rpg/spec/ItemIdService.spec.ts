import "jasmine"
import {itemIdService} from '../src/Database/models/ItemIdService'
import {Player} from '../src/Unit/Player'
import {WeaponFactory} from '../src/items/WeaponFactory'
import {MovementFactory} from '../src/items/MovementFactory'
import {ShieldFactory} from '../src/items/ShieldFactory'

const mockId = 'SomeId'
itemIdService.itemService.getIdOfItemInDatabase = async() => mockId

describe('ModelToMongooseModelConverter::', () => {
    describe('convertPlayer()', () => {
        it('should convert Items from the Player into ids', async() => {
            const mockPlayer = new Player(
                WeaponFactory.createFireAxeItem(),
                MovementFactory.createBaseHorseItem(),
                ShieldFactory.createBaseShieldItem()
            )
            try {
                const convertedPlayer = await itemIdService.convertPlayer(mockPlayer)
                expect(convertedPlayer.equippedDefenceItemId).toContain(mockId)
                expect(convertedPlayer.equippedWeaponItemId).toContain(mockId)
                expect(convertedPlayer.equippedMovementItemId).toContain(mockId)
            }catch (err) {
                expect(err).toBeFalsy()
            }
        })
    })
    describe('convertItem()', () => {

    })
})