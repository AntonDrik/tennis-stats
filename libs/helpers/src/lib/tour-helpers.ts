import { ITour } from '@tennis-stats/types';

class TourHelpers<T extends ITour> {
  constructor(private tour: T) {}

  getSetsCount(): number {
    return this.tour.matches?.[0]?.gameSets?.length ?? 1;
  }
}

export default TourHelpers;
