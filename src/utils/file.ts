export const getFilenameFromFilePathString = (filePathString: string) => {
  const pathChunks = filePathString.split("\\");
  return pathChunks[pathChunks.length - 1];
};
