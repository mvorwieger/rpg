import "jasmine"
import {itemIdService} from '../src/Database/services/ItemIdService'
import {Player} from '../src/Unit/Player'
import {WeaponFactory} from '../src/items/WeaponFactory'
import {MovementFactory} from '../src/items/MovementFactory'
import {ShieldFactory} from '../src/items/ShieldFactory'

const mockId = 'SomeId'
itemIdService.itemService.getItemIdByName = async() => mockId

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
                expect(convertedPlayer.defence).toContain(mockId)
                expect(convertedPlayer.weapon).toContain(mockId)
                expect(convertedPlayer.movement).toContain(mockId)
            }catch (err) {
                expect(err).toBeFalsy()
            }
        })
    })
    describe('convertItem()', () => {

    })
})