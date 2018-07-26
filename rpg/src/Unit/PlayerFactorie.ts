import {Player} from './Player'
import {Inventory} from '../Inventory'
import {Wallet} from '../Wallet'
import {DefenceItem, MovementItem, WeaponItem} from '../items/ItemTypes'
import {NoAttack, NoDefence, NoMovement} from '../items/NoItem'

export enum Race {
    Human = 'Human',
    Orc = 'Orc',
    Gnome = 'Gnome'
}

export class PlayerFactory {

    public chooseRace = (race: Race): Player => {
        if(race == Race.Human) return this.generateHuman()
        if(race == Race.Orc) return this.generateOrc()
        if(race == Race.Gnome) return this.generateGnome()
        return this.generateHuman()
    }

    private generateHuman = () => new Player(
        new NoAttack() as WeaponItem,
        new NoMovement() as MovementItem,
        new NoDefence() as DefenceItem,
        new Inventory(),
        new Wallet()
    )

    private generateOrc = () => new Player(
        new NoAttack() as WeaponItem,
        new NoMovement() as MovementItem,
        new NoDefence() as DefenceItem,
        new Inventory(),
        new Wallet()
    )

    private generateGnome = () => new Player(
        new NoAttack() as WeaponItem,
        new NoMovement() as MovementItem,
        new NoDefence() as DefenceItem,
        new Inventory(),
        new Wallet()
    )
}