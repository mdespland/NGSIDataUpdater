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
const express = require('express');
var openapi = require('express-openapi');
const swaggerUi = require('swagger-ui-express');

var StatusService = require('./api/services/statusService');
var SubscribeService = require('./api/services/subscribeService');
//var ApiDoc = require('./api/api-doc.yml');

const app = express();
var config = require("./config")
var bodyParser = require('body-parser');

openapi.initialize({
  app,
  // NOTE: If using yaml you can provide a path relative to process.cwd() e.g.
  // apiDoc: './api-v1/api-doc.yml',
  apiDoc: './api/api-doc.yml',
  consumesMiddleware: {
    'application/json': bodyParser.json()
  },
  dependencies: {
    statusService: StatusService,
    subscribeService: SubscribeService
  },
  paths: './api/paths',
  securityHandlers: {
    XAuthToken: function (req, scopes, definition) {
      if ((req.headers.hasOwnProperty("x-auth-token")) && (req.headers["x-auth-token"] === config.AuthToken)) {
        return true;
      } else {
        return false;
      }
    }
  },
  errorMiddleware: function (err, req, res, next) {
    console.log(JSON.stringify(err, null, 4))

    if (req.url==="/subscribe") {
      console.log("body too large")
      res.status(204).end();
      SubscribeService.manageEntityTooLarge();
    } else {
      if ((err.hasOwnProperty("status")) && (err.hasOwnProperty("message"))) {
        res.status(err.status).send(err.message);
      } else {
        res.status(500).send(err);
      }
    }
  }
});
//test
var options = {
  swaggerOptions: {
    url: '/api/api-docs'
  }
}



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));
try {
  app.listen(config.ListenPort, config.ListenIP);
} catch(error) {
  console.log(error);
}

