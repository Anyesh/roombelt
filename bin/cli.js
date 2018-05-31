#!/usr/bin/env node

process.env.NODE_ENV = "production";
require("../backend/config");
require("../backend/index");
