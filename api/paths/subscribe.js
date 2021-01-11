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
module.exports = function(subscribeService){
    let operations = {
      POST
    };
   
    async function POST(req, res, next) {
        await subscribeService.subscribeCall(req.body);
        res.status(204).end();
    }
   
    // NOTE: We could also use a YAML string here.
    POST.apiDoc = {
        operationId: 'subscribeCall',
        summary: 'Recieve a call from an Orion subscription',
        security: [],
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        oneOf : [
                            {
                                $ref: "#/components/schemas/SubscriptionCall"
                            },
                            {
                                $ref: "#/components/schemas/OrionErrorMessage"
                            }
                        ]
                    }
                }
            }
        },
        responses: {
            '204': {
                description: 'Call manage',
            }
        }
    };
    
    return operations;
  }