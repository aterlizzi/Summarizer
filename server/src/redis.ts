import Redis from "ioredis";

export const redis = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  db: 0,
  password:
    "RqEbRUjFuszBuELydR0Yln4tDEJWy0wvHnCYqKy7fWydndJi2jMYVsWyN/TuEO1cQBzHBeGK0x1hOBaGTg/95OvlhLzC0G09WZrmOmMTSK5OXrAYhPXJYalQX47L3zwmQpQGRQ",
});
