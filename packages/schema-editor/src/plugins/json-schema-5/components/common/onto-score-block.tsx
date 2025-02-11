import { Badge, Spinner } from 'design-react-kit';
import { useOntoScore } from '../../hooks';
import { Map } from 'immutable';

interface Props {
  jsonldContext: Map<string, any> | undefined;
  propertiesPaths: string[][] | undefined;
}

export function OntoScoreBlock({ jsonldContext, propertiesPaths }: Props) {
  const {
    status,
    error,
    data: { rawPropertiesCount, semanticPropertiesCount, score },
  } = useOntoScore(jsonldContext, propertiesPaths);

  return !jsonldContext || !propertiesPaths ? (
    <></>
  ) : status === 'pending' ? (
    <span className="d-inline-block align-middle">
      <Spinner active small />
    </span>
  ) : status === 'error' ? (
    <Badge
      color="danger"
      title={`A beta feature showing the ratio of semantic annotated properties to total properties (-/${rawPropertiesCount}).\nERROR: ${error}.`}
    >
      <small>OntoScore &beta;: ERROR</small>
    </Badge>
  ) : (
    <Badge
      color={score > 0.9 ? 'success' : score > 0.5 ? 'warning' : 'danger'}
      title={`A beta feature showing the ratio of semantic annotated properties to total properties (${semanticPropertiesCount}/${rawPropertiesCount}).`}
    >
      <small>OntoScore &beta;: {score.toFixed(2)}</small>
    </Badge>
  );
}
