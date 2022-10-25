import { WhereFilterOp } from 'firebase/firestore';

export type TQueryFilter = {
  name: string;
  operator: WhereFilterOp;
  value: string | number;
};
export type TQueryOrder = { name: string; direction: 'asc' | 'desc' };
