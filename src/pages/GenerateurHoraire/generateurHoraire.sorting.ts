import { Combinaison } from "../../features/generateur/generateur.types";

export const LOST_TIME_BETWEEN_CLASSES_SORT = "LOST_TIME_BETWEEN_CLASSES_SORT";
export const CONGES_SORT = "CONGES_SORT";
export const CONGES_LOST_TIME_SORT = "CONGES_LOST_TIME_SORT";
export const LATE_START_SORT = "LATE_START_SORT";
export const EARLY_FINISH_SORT = "EARLY_FINISH_SORT";

interface DayMetrics {
  start: number; 
  end: number;   
  duration: number; 
}

const computeMetrics = (combinaison: Combinaison): Record<string, DayMetrics> => {
  const days: Record<string, DayMetrics> = {};

  combinaison.groupes.forEach((g) => {
    g.activites.forEach((a) => {
      const { heureDepart, heureFin, jour } = a.horaire;
      
      const current = days[jour] || { start: Infinity, end: -Infinity, duration: 0 };
      
      days[jour] = {
        start: Math.min(current.start, heureDepart),
        end: Math.max(current.end, heureFin),
        duration: current.duration + (heureFin - heureDepart),
      };
    });
  });

  return days;
};

const getLostTime = (combinaison: Combinaison): number => {
  const days = computeMetrics(combinaison);
  return Object.values(days).reduce((acc, day) => {
    if (day.start === Infinity) return acc;
    return acc + (day.end - day.start - day.duration);
  }, 0);
};
const getAverageStartTime = (combinaison: Combinaison): number => {
  const days = computeMetrics(combinaison);
  const startTimes = Object.values(days)
    .map(d => d.start)
    .filter(s => s !== Infinity); 
  
  if (startTimes.length === 0) return 0;
  return startTimes.reduce((a, b) => a + b, 0) / startTimes.length;
};

const getAverageEndTime = (combinaison: Combinaison): number => {
  const days = computeMetrics(combinaison);
  const endTimes = Object.values(days)
    .map(d => d.end)
    .filter(e => e !== -Infinity);
  
  if (endTimes.length === 0) return 0;
  return endTimes.reduce((a, b) => a + b, 0) / endTimes.length;
};

const sorters = {
  lostTime: (a: Combinaison, b: Combinaison) => getLostTime(a) - getLostTime(b),
  conges: (a: Combinaison, b: Combinaison) => (b.conges?.length || 0) - (a.conges?.length || 0),
  lateStart: (a: Combinaison, b: Combinaison) => getAverageStartTime(b) - getAverageStartTime(a), // Descending
  earlyFinish: (a: Combinaison, b: Combinaison) => getAverageEndTime(a) - getAverageEndTime(b),   // Ascending
};

export const COMBINAISONS_SORTS: Record<
  string,
  (combinaisons: Combinaison[]) => Combinaison[]
> = {
  [CONGES_LOST_TIME_SORT]: (combinaisons) =>
    [...combinaisons].sort((a, b) => {
      const diffConges = sorters.conges(a, b);
      if (diffConges !== 0) return diffConges;
      return sorters.lostTime(a, b);
    }),

  [LOST_TIME_BETWEEN_CLASSES_SORT]: (combinaisons) =>
    [...combinaisons].sort(sorters.lostTime),

  [CONGES_SORT]: (combinaisons) => 
    [...combinaisons].sort(sorters.conges),

  [LATE_START_SORT]: (combinaisons) =>
    [...combinaisons].sort(sorters.lateStart),

  [EARLY_FINISH_SORT]: (combinaisons) =>
    [...combinaisons].sort(sorters.earlyFinish),
};
