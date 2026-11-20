import { describe, expect, it } from 'vitest';
import { buildSchedule } from '../../src/suite.js';

describe('buildSchedule', () => {
  it('resolves rows in order, first at 260ms then every 340ms', () => {
    expect(buildSchedule({ reducedMotion: false })).toEqual([
      { row: 0, delay: 260 },
      { row: 1, delay: 600 },
      { row: 2, delay: 940 },
      { row: 3, delay: 1280 },
      { row: 4, delay: 1620 },
    ]);
  });

  it('uses zero delays with reduced motion', () => {
    expect(buildSchedule({ reducedMotion: true }).map((s) => s.delay)).toEqual([0, 0, 0, 0, 0]);
  });
});
