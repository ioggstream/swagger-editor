import { SchemaEditor } from '@italia/schema-editor';
import '@italia/schema-editor/dist/style.css';

export function Standalone() {
  return (
    <div>
      <h1>Standalone</h1>

      <div style={{ height: 'calc(100vh - 200px)', overflow: 'hidden' }}>
        <SchemaEditor url="https://petstore.swagger.io/v2/swagger.json" />
      </div>
    </div>
  );
}
