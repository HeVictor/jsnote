import './code-cell.css';
import { useEffect, useState } from 'react';
import CodeEditor from '../code-editor';
import Preview from '../preview';
import Resizable from '../resizable';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { useCumulativeCode } from '../../hooks/use-cumulative-code';
import { FONT_TO_PX_CONV_RATE } from './editorConsts';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  const convertLineNumbersToHeight = (lineNums: number) => {
    const codeLinesHeight = (initialLineNumbers || 0) * FONT_TO_PX_CONV_RATE;

    const minHeight = 10 * FONT_TO_PX_CONV_RATE;
    const maxHeight = 15 * FONT_TO_PX_CONV_RATE;

    return Math.min(Math.max(codeLinesHeight, minHeight), maxHeight);
  };

  const [initialLineNumbers, setInitialLineNumbers] = useState<
    number | undefined
  >(0);

  return (
    <Resizable
      direction="vertical"
      initialVerticalHeight={convertLineNumbersToHeight(
        initialLineNumbers || 0
      )}
    >
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onCodeChange={(value) => updateCell(cell.id, value)}
            setInitialLineNumbers={(value) => setInitialLineNumbers(value)}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div className="progress-wrapper">
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          </div>
        ) : (
          <Preview code={bundle.code} err={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
