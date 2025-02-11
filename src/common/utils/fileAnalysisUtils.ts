export const analysisStates = {
  ANALYSE: "analyse",
  ANALYSING: "analysing",
  ANALYSED: "analysed",
} as const;

export const tooltipText = (hasFiles: boolean, state: string): string => {
  if (hasFiles) {
    return state === analysisStates.ANALYSED
      ? "receiver_session_files.button.analysed.info.text"
      : "receiver_session_files.button.analyse.info.text";
  }
  return "receiver_session_files.button.analyse.no.file.text";
};
