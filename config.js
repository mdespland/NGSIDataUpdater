//
// Copyright 2018-2020 Orange
//
// See the NOTICE file distributed with this work for additional information
// regarding copyright ownership.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict'
const tools = require('./lib/tools');

module.exports = {
    ListenPort: process.env.LISTEN_PORT || 8080,
    ListenIP: process.env.ISTEN_IP || "0.0.0.0",
    AuthToken: tools.readSecret("AUTH_TOKEN", "default"),
    OrionAPI: process.env.ORION_API || "http://172.17.0.1:1026",
    OrionService: process.env.ORION_SERVICE || "",
    OrionServicePath: process.env.ORION_SERVICE_PATH || ""
}