import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ActiviteWrapper from './Activite.styles';

function Activite({
  activite,
  flex,
  borderColor,
  color,
  disableNomCours,
  disableNomActivite,
  disableLocaux,
  disableModeEnseignement,
  disableEnseignant,
}) {
  const { t } = useTranslation('common');
  return (
    <ActiviteWrapper flex={flex} borderColor={borderColor} color={color}>
      <div className="wrapper">
        {!disableNomCours && (
          <span>
            <strong>
              {activite?.sigle}
              -
              {activite?.numeroGroupe}
            </strong>
          </span>
        )}
        {!disableModeEnseignement && <span>{t(activite?.modeEnseignement)}</span>}
        {!disableEnseignant && <span>{t(activite?.charges[0])}</span>}
        {!disableNomActivite && <span>{activite?.nom}</span>}
        {!disableLocaux && <span>{activite?.locaux?.join(',')}</span>}
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
  disableNomCours: PropTypes.bool,
  disableNomActivite: PropTypes.bool,
  disableLocaux: PropTypes.bool,
  disableModeEnseignement: PropTypes.bool,
  disableEnseignant: PropTypes.bool,
};

Activite.defaultProps = {
  disableNomCours: false,
  disableNomActivite: false,
  disableLocaux: false,
  disableModeEnseignement: true,
  disableEnseignant: true,
};

export default Activite;
