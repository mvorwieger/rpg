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

export class ModelToMongooseModelConverter {
    public static convertPlayer = (player: Player): Promise<any> => {
        return new Promise((resolve, reject) => {
            // create Promises
            const PequippedWeaponItem = itemService.getIdOfItemInDatabase(player.equippedItemList.weapon)
            const PequippedMovementItem = itemService.getIdOfItemInDatabase(player.equippedItemList.foot)
            const PequippedDefenceItem = itemService.getIdOfItemInDatabase(player.equippedItemList.shield)
            const Pinventory = player.items.map(itemService.getIdOfItemInDatabase)

            Promise.all([PequippedWeaponItem, PequippedMovementItem, PequippedDefenceItem, ...Pinventory]).then((res: { _id }[]) => {
                // Gather Results
                const [equippedWeaponItem, equippedMovementItem, equippedDefenceItem, ...inventoryItem] = res

                // Filter out Ids
                const inventoryItemIds = inventoryItem.map(d => d._id)
                const equippedWeaponItemId = equippedWeaponItem._id
                const equippedMovementItemId = equippedMovementItem._id
                const equippedDefenceItemId = equippedDefenceItem._id

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

    public static getBehaviourType(behaviour: Behaviour): String {
        if (instanceOfAttackBehaviour(behaviour)) return BehaviourNames.AttackBehaviour
        if (instanceOfDefenceBehaviour(behaviour)) return BehaviourNames.DefenceBehaviour
        if (instanceOfMoveBehaviour(behaviour)) return BehaviourNames.MoveBehaviour
        return undefined
    }

    public static convertItem(item: Item){
        const model = {
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
        return model
    }
}