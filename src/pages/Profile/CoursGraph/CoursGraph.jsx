import React, { useMemo, useRef, useState } from 'react';
import { GraphCanvas } from 'reagraph';
import useGraphTheme from './useGraphTheme';
import { useGetCoursQuery } from '../../../features/generateur/generateur.api';
import useCurrentUser from '../../../hooks/user/useCurrentUser';

function CoursGraph({ width = '30rem', height = '30rem' }) {
  const { user } = useCurrentUser();
  const { data: cours, isLoading } = useGetCoursQuery(
    user?.programmes,
    { skip: !user },
  );

  const nodes = useMemo(() => cours?.map((c) => ({
    id: c.sigle,
    label: c.sigle,
  })), [cours]);

  const edges = useMemo(() => cours?.flatMap(
    (c) => c.prealables?.filter((p) => cours.find((c1) => c1.sigle === p)).map((p) => ({
      id: `${p}->${c.sigle}`,
      source: p,
      target: c.sigle,
      label: `${p}->${c.sigle}`,
    })) || [],
  ), [cours]);

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

  if (isLoading || !user) return null;
  console.log('here');

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
