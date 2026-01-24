/**
 * Define los tipos de comunicación utilizados en la arquitectura del proyecto.
 * Permite describir cómo interactúan los distintos componentes del sistema.
 */
export enum ArchitectureCommunication {
  /** Comunicación sin estado basada en HTTP */
  REST = "REST",

  /** Comunicación mediante consultas y mutaciones tipadas */
  GRAPHQL = "GraphQL",

  /** Comunicación bidireccional en tiempo real */
  WEBSOCKET = "WebSocket",

  /** Arquitectura basada en eventos asíncronos */
  EVENT_DRIVEN = "Event driven",

  /** Protocolo ligero de mensajería, común en IoT */
  MQTT = "MQTT",

  /** Protocolo industrial para interoperabilidad de sistemas */
  OPCUA = "OPC UA",
}
