import './array-model.scss';

import { DeprecatedBlock } from './common/deprecated-block';
import { DescriptionBlock } from './common/description-block';
import { ExampleBlock } from './common/example-block';
import { ExternalDocsBlock } from './common/external-docs-block';
import { HeadingBlock } from './common/heading-block';
import { JsonLdContextBlock } from './common/jsonld-context-block';
import { PropertiesBlock } from './common/properties-block';
import { RDFOntologiesBlock } from './common/rdf-ontologies-block';
import { TypeFormatBlock } from './common/type-format-block';

export const ArrayModel = (props) => {
  const {
    schema,
    name,
    displayName,
    getComponent,
    getConfigs,
    depth,
    specPath,
    jsonldContext: rootJsonldContext,
  } = props;

  const specPathArray = Array.from(specPath);
  const propertyName = specPathArray[specPathArray.length - 1] as string;
  const title = (schema?.get('title') as string) || displayName || name || '';
  const jsonldContext = rootJsonldContext || schema.get('x-jsonld-context');
  const items = schema.get('items');
  const properties = schema.filter(
    (v, key) => ['type', 'items', 'description', '$$ref', 'externalDocs', 'example'].indexOf(key) === -1,
  );

  const Model = getComponent('Model');

  return (
    <div className="modello array-model">
      {depth === 1 ? (
        <HeadingBlock
          title={title}
          specPath={specPath}
          jsonldContext={jsonldContext}
          propertyName={propertyName}
          getComponent={getComponent}
        >
          {/* <OntoScoreBlock schema={schema} jsonldContext={jsonldContext} /> */}
        </HeadingBlock>
      ) : (
        <RDFOntologiesBlock jsonldContext={jsonldContext} propertyName={propertyName} />
      )}

      <TypeFormatBlock type="array" jsonldContext={jsonldContext} propertyName={propertyName} />

      <DeprecatedBlock schema={schema} />

      <DescriptionBlock schema={schema} getComponent={getComponent} />

      <ExternalDocsBlock schema={schema} getComponent={getComponent} />

      <PropertiesBlock properties={properties} getComponent={getComponent} />

      <div>
        <Model
          {...props}
          getConfigs={getConfigs}
          specPath={specPath.push('items')}
          name={null}
          schema={items}
          required={false}
          depth={depth + 1}
          jsonldContext={jsonldContext}
        />
      </div>

      <ExampleBlock schema={schema} jsonldContext={jsonldContext} depth={depth} getConfigs={getConfigs} />

      <JsonLdContextBlock jsonldContext={jsonldContext} depth={depth} />
    </div>
  );
};
