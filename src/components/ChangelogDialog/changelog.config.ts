/* eslint-disable camelcase */
import { ChangelogEntry } from './changelog.types';
import Changelog_2026_01_11 from './changelogs/Changelog_2026_01_11';

export const CHANGELOG_STORAGE_KEY = 'horairets_changelog_last_seen';

export const CHANGELOGS: ChangelogEntry[] = [
  {
    date: '2026-01-11',
    Content: Changelog_2026_01_11,
  },
];

export function getUnseenChangelogs(lastSeenDate: string | null): ChangelogEntry[] {
  if (!lastSeenDate) {
    return CHANGELOGS;
  }
  return CHANGELOGS.filter((entry) => entry.date > lastSeenDate);
}

export function getLatestChangelogDate(): string {
  return CHANGELOGS[CHANGELOGS.length - 1]?.date ?? '';
}
