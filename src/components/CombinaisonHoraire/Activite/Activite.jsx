import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import ActiviteWrapper from './Activite.styles';
import { selectAffichage } from '../../../features/affichage/affichage.slice';

function Activite({
  activite,
  flex,
  borderColor,
  color,

}) {
  const { t } = useTranslation('common');
  const affichage = useSelector(selectAffichage);
  return (
    <ActiviteWrapper flex={flex} borderColor={borderColor} color={color}>
      <div className="wrapper">
        {affichage.showNomCoursGroupe && (
          <span>
            <strong>
              {activite?.sigle}
              -
              {activite?.numeroGroupe}
            </strong>
          </span>
        )}
        {affichage.showModeEnseignement && <span>{t(activite?.modeEnseignement)}</span>}

        {affichage.showNomActivite && <span>{activite?.nom}</span>}
        {affichage.showLocaux && <span>{activite?.locaux?.join(',')}</span>}
        {
            affichage.showCharges && (
            <div>
              {activite?.charges.map((charge) => (
                <span>{charge}</span>
              ))}
            </div>
            )
          }
      </div>
    </ActiviteWrapper>
  );
}

Activite.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  activite: PropTypes.object.isRequired,
  flex: PropTypes.number.isRequired,
  borderColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Activite;
