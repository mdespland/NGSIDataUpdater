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
const fs = require('fs');

module.exports = {
    readSecret(key, value) {
        var result = "";
        if (process.env.hasOwnProperty(key + "_FILE")) {
            try {
                result = fs.readFileSync(process.env[key + "_FILE"], "utf8");
            } catch (error) {
                console.log("Can't read secret file for "+key+ " : "+ process.env[key + "_FILE"]);
                result= value;
            }
        } else {
            if (process.env.hasOwnProperty(key)) {
                result = process.env[key];
            } else {
                result= value;
            }
        }
        return result;
    },
    readBoolean(key, value) {
        var result = "";
        if (process.env.hasOwnProperty(key)) {
            if (process.env[key].toUpperCase() === "TRUE" || process.env[key].toUpperCase() === "YES") {
                result = true;
            } else {
                result = false;
            }
        } else {
            result = value;
        }
        return result;
    },
    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}