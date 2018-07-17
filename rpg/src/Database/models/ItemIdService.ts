import {Player} from '../../Unit/Player'
import {IItemModel, ItemModel} from './MongooseModels'
import {AttackBehaviour} from '../../items/Behaviours/AttackBehaviour'
import {DefenceBehaviour} from '../../items/Behaviours/DefenceBehaviour'
import {MoveBehaviour} from '../../items/Behaviours/MoveBehaviour'
import {Item} from '../../items/Item'
import {
    Behaviour, BehaviourNames, instanceOfAttackBehaviour, instanceOfDefenceBehaviour,
    instanceOfMoveBehaviour
} from '../../items/Behaviours/Behaviour'
import {itemService} from './ItemService'
import {Document} from 'mongoose'

class ItemIdService {
    constructor(public itemService) {
        this.itemService = itemService
    }

    public convertPlayer = (player: Player): Promise<any> => {
        return new Promise((resolve, reject) => {
            // create Promises
            const PromiseEquippedWeaponItem = this.itemService.getIdOfItemInDatabase(player.equippedItemList.weapon)
            const PromiseEquippedMovementItem = this.itemService.getIdOfItemInDatabase(player.equippedItemList.foot)
            const PromiseEquippedDefenceItem = this.itemService.getIdOfItemInDatabase(player.equippedItemList.shield)
            const PromiseInventory = player.items.map(this.itemService.getIdOfItemInDatabase)

            Promise.all([PromiseEquippedWeaponItem, PromiseEquippedMovementItem, PromiseEquippedDefenceItem, ...PromiseInventory])
                .then((res: Document[]) => {
                    // Gather Results
                    const [equippedWeaponItemId, equippedMovementItemId, equippedDefenceItemId, ...inventoryItemIds] = res

                    resolve({
                        health: player.health,
                        inventoryItemIds,
                        equippedWeaponItemId,
                        equippedMovementItemId,
                        equippedDefenceItemId,
                        walletMoney: player.wallet.money
                    })
                }).catch((err) => reject('couldnt fetch item ids: ' + err))
        })
    }

    public getBehaviourType(behaviour: Behaviour): String {
        if (instanceOfAttackBehaviour(behaviour)) return BehaviourNames.AttackBehaviour
        if (instanceOfDefenceBehaviour(behaviour)) return BehaviourNames.DefenceBehaviour
        if (instanceOfMoveBehaviour(behaviour)) return BehaviourNames.MoveBehaviour
        return undefined
    }

    public convertItem(item: Item) {
        return {
            rarity: item.rarity,
            value: item.value,
            name: item.name,
            behaviourType: this.getBehaviourType(item.behaviour),
            behaviourValues: {
                behaviourAttackDamage: (item.behaviour as AttackBehaviour).attackDamage,
                behaviourMoveSpeed: (item.behaviour as MoveBehaviour).moveSpeed,
                behaviourBlockPercentage: (item.behaviour as DefenceBehaviour).blockPercentage,
                behaviourBlockValue: (item.behaviour as DefenceBehaviour).blockAmount
            }
        }
    }
}

export const itemIdService = new ItemIdService(itemService)