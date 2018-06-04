import {Troll} from './Troll';
import {Run} from '../move/Run';
import {Axe} from '../attack/Axe';
import {Walk} from '../move/Walk';
import {Punch} from '../attack/Punch';
import {Human} from './Human';

export class NpcFactory {
    public static createTroll = () => new Troll(new Run(), new Axe());
    public static createHuman = () => new Human(new Walk(), new Punch());
}