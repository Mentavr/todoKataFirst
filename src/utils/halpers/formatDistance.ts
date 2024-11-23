import { formatDistanceToNow } from 'date-fns';

export const formatDistance = (date: Date) => {
  return formatDistanceToNow(date, { includeSeconds: true });
};
