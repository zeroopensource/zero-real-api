import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { resourceFromAttributes } from "@opentelemetry/resources"
import { NodeSDK } from "@opentelemetry/sdk-node"
import { SemanticResourceAttributes as SRA } from "@opentelemetry/semantic-conventions"

import {
  SERVICE_DEPLOYMENT_ENVIRONMENT,
  SERVICE_NAME,
  SERVICE_VERSION,
} from "../config/service"

export const otelSDK = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
  }),
  resource: resourceFromAttributes({
    [SRA.SERVICE_NAME]: SERVICE_NAME,
    [SRA.SERVICE_VERSION]: SERVICE_VERSION,
    [SRA.DEPLOYMENT_ENVIRONMENT]: SERVICE_DEPLOYMENT_ENVIRONMENT,
  }),
})
