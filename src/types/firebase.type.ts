export type TQueryFilter = {
  name: string;
  operator: string;
  value: string | number;
};
export type TQueryOrder = { name: string; direction: 'asc' | 'desc' };
