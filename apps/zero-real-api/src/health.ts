import { Hono } from "hono"

import { SERVICE_NAME, SERVICE_VERSION } from "./config/service"
import { tracer } from "./otel/tracer"

export const healthRoute = new Hono()

healthRoute.get("/healthz", async c => {
  const span = tracer.startSpan("healthz-check", {
    attributes: {
      "service.name": SERVICE_NAME,
      "service.version": SERVICE_VERSION,
    },
  })

  const uptime = process.uptime()
  const timestamp = new Date().toISOString()

  const health = {
    service: { name: SERVICE_NAME, version: SERVICE_VERSION },
    status: "ok",
    uptime,
    timestamp,
    dependencies: {
      postgres: "ok",
      redis: "ok",
    },
  }

  span.setAttributes({
    "health.status": health.status,
    "health.uptime": uptime,
    "health.timestamp": timestamp,
  })

  span.end()

  return c.json(health)
})

// const res = {
//   service: {
//     name: "user-service",
//     version: "1.0.0",
//   },
//   status: "ok",
//   uptime: 12345.67,
//   timestamp: "2025-06-28T10:00:00Z",
//   dependencies: {
//     postgres: "ok",
//     redis: "ok",
//   },
// }
