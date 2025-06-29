import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { resourceFromAttributes } from "@opentelemetry/resources"
import { NodeSDK } from "@opentelemetry/sdk-node"

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
    "service.name": SERVICE_NAME,
    "service.version": SERVICE_VERSION,
    "service.deployment.environment": SERVICE_DEPLOYMENT_ENVIRONMENT,
  }),
})
