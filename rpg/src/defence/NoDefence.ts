import {DefenceBehaviour} from '../interfaces/Behaviours/DefenceBehaviour';

export class NoDefence implements DefenceBehaviour{
    blockPercentage = null;
    blockAmount = null;

    block() {
        return null;
    }
}