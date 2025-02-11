/**
 * A component that renders a primitive model (e.g. a string, number, boolean, etc.).
 */
import './primitive-model.scss';

import { useJsonLDResolver, useRDFPropertyResolver } from '../hooks';
import { getExtensions, getParentType } from '../utils';
import { DeprecatedBlock } from './common/deprecated-block';
import { DescriptionBlock } from './common/description-block';
import { ExampleAccordion } from './common/example-accordion';
import { ExternalDocsBlock } from './common/external-docs-block';
import { HeadingBlock, HeadingBlockLeft, HeadingBlockRight } from './common/heading-block';
import { JsonLdContextAccordion } from './common/jsonld-context-accordion';
import { ModelTitle } from './common/model-title';
import { NavigateBack } from './common/navigate-back';
import { PropertiesBlock } from './common/properties-block';
import { RDFOntologicalClassPropertyBlock } from './common/rdf-ontological-class-property-block';
import { SemanticDescriptionBlock } from './common/semantic-description-block';
import { TypeFormatVocabularyBlock } from './common/type-format-vocabulary-block';

export const PrimitiveModel = ({
  schema,
  name,
  displayName,
  depth,
  specPath,
  jsonldContext,
  getComponent,
  getConfigs,
  specSelectors,
}) => {
  const { showExtensions } = getConfigs();

  const specPathArray = Array.from(specPath) as string[];
  const propertyName = specPathArray[specPathArray.length - 1] as string;
  const title = (schema?.get('title') as string) || displayName || name || '';
  const type = schema.get('type');
  const format = schema.get('format');
  const xml = schema.get('xml');
  const enumArray = schema.get('enum');
  const extensions = getExtensions(schema);
  const properties = schema
    .filter(
      (_, key) => ['enum', 'type', 'format', 'description', '$$ref', 'externalDocs', 'example'].indexOf(key) === -1,
    )
    .filterNot((_, key) => extensions.has(key));

  // Customize the view when parent type is array.
  const isArrayElement = getParentType(specSelectors, specPathArray) === 'array' && propertyName === 'items';

  // Ontological resolvers.
  const findKey = specPathArray.slice(3).filter((x) => x !== 'properties');
  const { data: jsonLDResolverResult } = useJsonLDResolver(jsonldContext, findKey);
  const { data: rdfProperty } = useRDFPropertyResolver(jsonLDResolverResult?.fieldUri);

  // View models
  const JumpToPath = getComponent('JumpToPath', true);

  return (
    <div className="modello primitive-model">
      {depth === 1 ? (
        <>
          <HeadingBlock>
            <HeadingBlockLeft>
              <NavigateBack />
              <ModelTitle title={title} />
            </HeadingBlockLeft>
            <HeadingBlockRight>
              <JumpToPath specPath={specPath} />
            </HeadingBlockRight>
          </HeadingBlock>

          <hr />
        </>
      ) : (
        !isArrayElement && <RDFOntologicalClassPropertyBlock fieldUri={jsonLDResolverResult?.fieldUri} />
      )}

      <TypeFormatVocabularyBlock
        type={type}
        format={format}
        jsonldContext={jsonldContext}
        propertyName={propertyName}
        rdfProperty={rdfProperty}
      />

      {enumArray && <div className="prop-enum">Enum: [ {enumArray.join(', ')} ]</div>}

      <DeprecatedBlock schema={schema} />

      <DescriptionBlock schema={schema} getComponent={getComponent} />

      <SemanticDescriptionBlock getComponent={getComponent} description={rdfProperty?.ontologicalPropertyComment} />

      <ExternalDocsBlock schema={schema} getComponent={getComponent} />

      <PropertiesBlock properties={properties} getComponent={getComponent} />

      {showExtensions && <PropertiesBlock properties={extensions} getComponent={getComponent} />}

      {xml && xml.size ? (
        <span>
          <br />
          <span className="property">xml:</span>
          {xml
            .entrySeq()
            .map(([key, v]) => (
              <span key={`${key}-${v}`} className="property">
                <br />
                &nbsp;&nbsp;&nbsp;{key}: {String(v)}
              </span>
            ))
            .toArray()}
        </span>
      ) : null}

      <ExampleAccordion schema={schema} jsonldContext={jsonldContext} depth={depth} getConfigs={getConfigs} />
      <JsonLdContextAccordion jsonldContext={jsonldContext} depth={depth} />
    </div>
  );
};
