import { ComponentType } from 'react';

export interface ChangelogContentProps {
  onDismiss: () => void;
}

export interface ChangelogEntry {
  date: string;
  Content: ComponentType<ChangelogContentProps>;
}
