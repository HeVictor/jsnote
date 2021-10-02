import { Cell } from '../interfaces/models';

export const defaultCellsContent: Cell[] = [
  {
    content:
      '# JSNote\n\nThis is an interactive coding and documentation environment. Write some JavaScript, see it executed, and also write comprehensive documentation using markdown.\n- Add new cells by hovering on the divider between the cells.\n- Cells can be re-ordered and deleted through the button at the top-right.\n- Click within any text cell (like this one) to enter edit mode. Click away to see the full markdown in action.\n- The code in all the code editor cells are shared sequentially as if in one file. Variables defined in higher cells will be visible to the following cells.\n- Call the built-in `show` function to display any React component or printable JavaScript objects in the preview window.\n\nJSNote will load any existing content and save the changes you make to the file you opened the application with (by default it is saved to `notebook.js`). ',
    type: 'text',
    id: 'j2omw',
  },
  {
    content:
      "import { useState } from 'react';\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <button onClick={() => setCount(count + 1)}>Click</button>\n      <div style={{ marginTop: '10px' }}>\n        <b>Count: {count}</b>\n      </div>\n    </div>\n  );\n};\n\n// Display any variable or React Components by calling 'show'\nshow(<Counter />);",
    type: 'code',
    id: '7v4dc',
  },
  {
    content:
      '// Import from any publicly available npm package\nimport \'bulmaswatch/minty/bulmaswatch.min.css\';\nimport { pirate } from \'talk-like-a\';\n\nconst greetingMsg = \'Hi stranger!\';\nconst infoMsg = \'Welcome to the clicking game!\';\n\nconst FancyCounter = () => {\n  return (\n    <div style={{ marginTop: \'10px\' }}>\n      <section className="hero is-small is-info">\n        <div class="hero-body">\n          <p class="title">{pirate(greetingMsg)}</p>\n          <p class="subtitle">{infoMsg}</p>\n        </div>\n      </section>\n      <div className="column is-one-third">\n        <div className="box has-background-warning">\n          <Counter />\n        </div>\n      </div>\n    </div>\n  );\n};\n\nshow(<FancyCounter />);',
    type: 'code',
    id: 'dulm3',
  },
];
