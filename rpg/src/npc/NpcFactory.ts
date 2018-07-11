import {Troll} from './Troll';
import {Run} from '../moveTypes/Run';
import {Axe} from '../attackTypes/Axe';
import {Walk} from '../moveTypes/Walk';
import {Punch} from '../attackTypes/Punch';
import {Human} from './Human';

export class NpcFactory {
    public static createTroll = () => new Troll(new Run(), new Axe());
    public static createHuman = () => new Human(new Walk(), new Punch());
}