import React from "react";

interface ActiviteSpacerProps {
  flex: number;
}

function ActiviteSpacer({ flex }: ActiviteSpacerProps): JSX.Element {
  return (
    <div
      style={{
        flex,
      }}
    />
  );
}

export default ActiviteSpacer;
