import {DefenceBehaviour} from '../interfaces/DefenceBehaviour';

export class NoDefence implements DefenceBehaviour{
    block() {
        return null;
    }
}