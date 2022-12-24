import React from 'react';
import ActiviteWrapper from './Activite.styles';

function Activite({
  activite, flex, borderColor, color,
}) {
  return (
    <ActiviteWrapper flex={flex} borderColor={borderColor} color={color}>
      <div className="wrapper">
        <span>
          {activite?.sigle}
          -
          {activite?.numeroGroupe}
        </span>
        <span>
          {activite?.nom}
        </span>
        <span>
          {activite?.locaux?.join(',')}
        </span>
      </div>
    </ActiviteWrapper>
  );
}

export default Activite;
