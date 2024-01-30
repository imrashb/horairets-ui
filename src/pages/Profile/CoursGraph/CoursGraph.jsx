import React, { useMemo, useRef, useState } from 'react';
import { GraphCanvas } from 'reagraph';
import useGraphTheme from './useGraphTheme';

function CoursGraph({ width = '30rem', height = '30rem' }) {
  const cours = useMemo(() => [
    { sigle: 'LOG100', prealable: [] },
    { sigle: 'LOG121', prealable: ['LOG100'] },
    { sigle: 'MAT350', prealable: [] },
    { sigle: 'MAT472', prealable: ['MAT350', 'LOG121'] },
  ], []);

  const nodes = useMemo(() => cours.map((c) => ({
    id: c.sigle,
    label: c.sigle,
  })), [cours]);

  const edges = useMemo(() => cours.flatMap((c) => c.prealable.map((p) => ({
    id: `${p}->${c.sigle}`,
    source: p,
    target: c.sigle,
    label: `${p}->${c.sigle}`,
  }))), [cours]);

  const theme = useGraphTheme();
  const graphRef = useRef(null);

  const [selections, setSelections] = useState([]);
  const onNodeClick = (node) => {
    setSelections((prev) => {
      if (prev.includes(node.id)) {
        return prev.filter((n) => n !== node.id);
      }
      return [...prev, node.id];
    });
  };

  return (
    <div style={{ position: 'relative', width, height }}>
      <GraphCanvas
        labelFontUrl="https://fonts.googleapis.com/css2?family=Fugaz+One&family=Titillium+Web:wght@300;400;600;700&display=swap"
        nodes={nodes}
        edges={edges}
        layoutType="treeLr2d"
        theme={theme}
        selections={selections}
        onNodeClick={onNodeClick}
        ref={graphRef}
      />
    </div>
  );
}

export default CoursGraph;
