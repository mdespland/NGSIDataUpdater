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
module.exports = function(statusService){
    let operations = {
      GET
    };
   
    function GET(req, res, next) {
      res.status(200).json(statusService.getStatus());
    }
   
    // NOTE: We could also use a YAML string here.
    GET.apiDoc = {
        operationId: 'getStatus',
        summary: 'Returns the status of the component',
        security: [],
        responses: {
            '200': {
                description: 'The status of the component',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Status'
                        }
                    }
                }
            }
        }
    };
    
    return operations;
  }