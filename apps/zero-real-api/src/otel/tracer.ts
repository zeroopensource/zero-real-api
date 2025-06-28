import { trace } from "@opentelemetry/api"

import { SERVICE_NAME } from "../config/service"

export const tracer = trace.getTracer(SERVICE_NAME)
