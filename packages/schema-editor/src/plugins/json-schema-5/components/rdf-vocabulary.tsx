import { Badge, Icon } from 'design-react-kit';
import { useJsonLDContextResolver } from '../hooks';

export const RDFVocabulary = ({ propertyName, jsonldContext, className }) => {
  const { vocabularyUri } = useJsonLDContextResolver(propertyName, jsonldContext);

  return vocabularyUri ? (
    <Badge color="success" href={vocabularyUri} target="_blank" rel="noreferrer" className={className}>
      <span>
        Show values <Icon icon="it-external-link" size="xs" color="white" title="View vocabulary" />
      </span>
    </Badge>
  ) : null;
};
