export type Festival = {
  name: string;
  bands: Band[];
};

export type Band = {
  name: string;
  recordLabel: string;
};

export type BandGroups = {
  festival: string;
  name: string;
  recordLabel: string;
};
