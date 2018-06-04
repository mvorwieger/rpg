import {Battle} from '../Battle';
import {Reward} from './Reward';

export interface Level {
    reward: Reward,
    battle: Battle
}