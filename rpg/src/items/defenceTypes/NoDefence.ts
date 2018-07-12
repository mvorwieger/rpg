import {DefenceBehaviour} from '../Behaviours/DefenceBehaviour';

export class NoDefence implements DefenceBehaviour{
    blockPercentage = null;
    blockAmount = null;

    block() {
        return null;
    }
}