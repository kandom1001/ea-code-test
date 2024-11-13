import { Festival } from "../types/festivalsType";

export const groupDataByRecordLabels = (festivals: Festival[]) => {
  const flatData = festivals?.flatMap((festival) =>
    festival.bands.map((band) => ({
      ...band,
      festival: festival.name,
    }))
  );
  const sortedByRecordLabel = Object.groupBy(
    flatData,
    ({ recordLabel }) => recordLabel
  );
  return sortedByRecordLabel;
};
