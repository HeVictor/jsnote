import { Cell } from '../interfaces/models';

export const convertToJSFileFormat = (cells: Cell[]): string => {
  const cumulativeContent: string[] = [];

  cells.forEach(({ content, type, id }) => {
    cumulativeContent.push(generateCellIdentifierLabel(type, id));

    switch (type) {
      case 'code':
        cumulativeContent.push(content);
        break;
      case 'text':
      default:
        cumulativeContent.push(wrapStrWithCommentBlocks(content));
    }
  });

  return cumulativeContent.join('\n').trim();
};

const generateCellIdentifierLabel = (type: string, id: string): string => {
  return `\n/*${type}-${id}*/`;
};

const wrapStrWithCommentBlocks = (text: string): string => {
  return `/*\n${text}\n*/`;
};

export const convertToCellsFormat = (fileContent: string): Cell[] => {
  const fileLines: string[] = fileContent.split('\n');

  const cells: Cell[] = [];
  let cellDivider: string = '';
  let cellContent: string[] = [];

  fileLines.forEach((line) => {
    if (isCellDivider(line)) {
      if (cellDivider) {
        cells.push(convertToCell(cellDivider, cellContent));
      }

      cellDivider = line;
      cellContent = [];
    } else {
      cellContent.push(line);
    }
  });

  if (cellDivider && cellContent.length > 0) {
    cells.push(convertToCell(cellDivider, cellContent));
  }

  return cells;
};

const isCellDivider = (line: string): boolean => {
  return /^(\/\*)((text|code)-[A-Za-z0-9]+)(\*\/)$/.test(line);
};

const convertToCell = (cellDivider: string, cellContent: string[]): Cell => {
  const cellTypeAndId: string[] = cellDivider.replace(/[\/\*]/g, '').split('-');

  let joinedContent = cellContent.join('\n');

  const cellType: 'text' | 'code' = cellTypeAndId[0] as 'text' | 'code';
  switch (cellType) {
    case 'text':
      joinedContent = joinedContent.replace(/(^\/\*|\*\/$)/gm, ''); // Replace only the first and last instance of /* and */
    case 'code':
    default:
      break;
  }

  return {
    id: cellTypeAndId[1],
    type: cellType,
    content: joinedContent,
  };
};
