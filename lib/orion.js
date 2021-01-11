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
'use strict';

const Config = require('../config');
const axios = require('axios');

module.exports = {
    decodeSubscription: decodeSubscription,
    entityExists: entityExists,
    createEntity: createEntity,
    updateEntity: updateEntity,
    getEntity: getEntity,
    getEntitiesOfType: getEntitiesOfType,
    deleteEntity: deleteEntity,
    listSubscription: listSubscription,
    getSubscription: getSubscription,
    deleteSubscription: deleteSubscription,
    createSubscription,
    searchSubscription,
    searchEntities
}
async function sendRequest(request, expected) {
    var response;
    if (Config.OrionService != "") request.headers["Fiware-Service"] = Config.OrionService;
    if (Config.OrionServicePath != "") request.headers["Fiware-ServicePath"] = Config.OrionServicePath;
    try {
        response = await axios.request(request);
    } catch (error) {
        return Promise.reject(error)
    }
    if (response.status === expected) {
        return response;
    } else {
        return Promise.reject(response.status + " " + response.statusText)
    }
}

async function decodeSubscription(req) {
    if (req.body.hasOwnProperty("data") && req.body.hasOwnProperty("subscriptionId") && typeof req.body.data === "object" && req.body.data.hasOwnProperty("length")) {
        return req.body;
    } else {
        throw new Error("Invalid subscription")
    }
}
async function entityExists(entityid) {
    var orion = Config.OrionAPI;
    var request = {
        method: 'GET',
        url: orion + "/v2/entities/" + entityid,
        headers: {},
        json: true
    };
    try {
        await sendRequest(request, 200);
        return true;
    } catch (error) {
        return false;
    }

}

async function getEntity(entityid) {
    var orion = Config.OrionAPI;
    var request = {
        method: 'GET',
        url: orion + "/v2/entities/" + entityid,
        headers: {},
        json: true
    };
    try {
        var response = await sendRequest(request, 200);
        return response.data;
    } catch (error) {
        return Promise.reject("Entity " + entityid + " not found")
    }
}

async function deleteEntity(entityid) {
    var orion = Config.OrionAPI;
    var request = {
        method: 'DELETE',
        url: orion + "/v2/entities/" + entityid,
        headers: {},
        json: true
    };
    try {
        await sendRequest(request, 204);
        return true;
    } catch (error) {
        return false;
    }
}


async function createEntity(entity) {
    var orion = Config.OrionAPI;
    var request = {
        method: 'POST',
        url: orion + "/v2/entities/",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(entity),
        json: true
    };
    try {
        var response = await sendRequest(request, 201);
        return true;
    } catch (error) {
        return Promise.reject("Can't create entity: " + error)
    }
}

async function updateEntity(id, attrs) {
    var orion = Config.OrionAPI;
    var request = {
        method: 'PUT',
        url: orion + "/v2/entities/"+id+"/attrs",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(attrs),
        json: true
    };
    try {
        var response = await sendRequest(request, 204);
        return true;
    } catch (error) {
        return Promise.reject("Can't update entity: " + error)
    }
}


async function getEntitiesOfType(type, limit) {
    var orion = Config.OrionAPI;
    var request = {
        method: 'GET',
        url: orion + "/v2/entities/?type=" + type + "&limit=" + limit,
        headers: {},
        json: true
    };
    try {
        var response = await sendRequest(request, 200);
        return response.data;
    } catch (error) {
        return Promise.reject("Entity " + entityid + " not found")
    }
}

async function getSubscription(id) {
    var orion = Config.OrionAPI;
    var request = {
        method: 'GET',
        url: orion + "/v2/subscriptions/" + id,
        headers: {},
        json: true
    };
    try {
        var response = await sendRequest(request, 200);
        return response.data;
    } catch (error) {
        return Promise.reject("Entity " + entityid + " not found")
    }
}

async function deleteSubscription(id) {
    var orion = Config.OrionAPI;
    var request = {
        method: 'DELETE',
        url: orion + "/v2/subscriptions/" + id,
        headers: {},
        json: true
    };
    try {
        await sendRequest(request, 204);
        return true;
    } catch (error) {
        return false;
    }
}


async function createSubscription(subscription) {
    var orion = Config.OrionAPI;
    var request = {
        method: 'POST',
        url: orion + "/v2/subscriptions/",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(subscription),
        json: true
    };
    try {
        var response = await sendRequest(request, 201);
        if (response.hasOwnProperty("headers") && (response.headers.hasOwnProperty("location"))) {
            var location=response.headers.location;
            return location.replace("/v2/subscriptions/", "");
        } else {
            return Promise.reject(response)
        }
    } catch (error) {
        return Promise.reject("Can't create entity: " + error)
    }
}

async function listSubscription() {
    var orion = Config.OrionAPI;
    var request = {
        method: 'GET',
        url: orion + "/v2/subscriptions",
        headers: {},
        json: true
    };
    try {
        var response = await sendRequest(request, 200);
        return response.data;
    } catch (error) {
        return Promise.reject("Entity " + entityid + " not found")
    }
}

async function searchSubscription(subscription) {
    var orion = Config.OrionAPI;
    var request = {
        method: 'GET',
        url: orion + "/v2/subscriptions",
        headers: {},
        json: true
    };
    try {
        var response = await sendRequest(request, 200);
        var found=false;
        var id="";
        for (const elt of response.data) {
            if ((JSON.stringify(elt.subject)===JSON.stringify(subscription.subject)) && 
                (JSON.stringify(elt.notification.attrs)===JSON.stringify(subscription.notification.attrs)) &&
                (JSON.stringify(elt.notification.http)===JSON.stringify(subscription.notification.http))) {
                    found=true;
                    id=elt.id;
            }

        }
        if (found) {  
            return id;
        } else {
            return Promise.reject("Subscription not found")
        }
    } catch (error) {
        return Promise.reject("Entity " + entityid + " not found")
    }
}

async function searchEntities(query) {
    var orion = Config.OrionAPI;
    var request = {
        method: 'GET',
        url: orion + "/v2/entities?"+query,
        headers: {},
        json: true
    };
    try {
        var response = await sendRequest(request, 200);
        
    } catch (error) {
        return Promise.reject("Entity " + entityid + " not found")
    }
}
