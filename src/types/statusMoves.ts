import statusMoves from '@/assets/statusMoves.json';
import { Type } from './types';

export default statusMoves as Record<Type, Record<number, string[]>>;
