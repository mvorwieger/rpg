import {Troll} from './Troll';
import {Run} from '../../items/moveTypes/Run';
import {Axe} from '../../items/attackTypes/Axe';
import {Walk} from '../../items/moveTypes/Walk';
import {Punch} from '../../items/attackTypes/Punch';
import {Human} from './Human';
import {NoDefence} from '../../items/defenceTypes/NoDefence';

export class NpcFactory {
    public static createTroll = () => new Troll(new Run(), new Axe(10), new NoDefence());
    public static createHuman = () => new Human(new Walk(), new Punch(), new NoDefence());
}