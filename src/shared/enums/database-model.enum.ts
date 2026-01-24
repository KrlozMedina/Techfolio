/**
 * Enum que representa los tipos de modelos de base de datos que un proyecto puede utilizar.
 * - RELATIONAL: Bases de datos relacionales (SQL, MySQL, PostgreSQL, etc.).
 * - DOCUMENT: Bases de datos orientadas a documentos (MongoDB, CouchDB, etc.).
 * - KEY_VALUE: Bases de datos clave-valor (Redis, DynamoDB, etc.).
 * - GRAPH: Bases de datos de grafos (Neo4j, ArangoDB, etc.).
 * - TIMESERIES: Bases de datos de series temporales (InfluxDB, TimescaleDB, etc.).
 */
export enum DatabaseModel {
  RELATIONAL = "Relational",
  DOCUMENT = "Document",
  KEY_VALUE = "Key value",
  GRAPH = "Graph",
  TIMESERIES = "Time series",
}
