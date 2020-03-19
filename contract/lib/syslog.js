/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('./node_modules/fabric-contract-api');

class SysLog extends Contract {

    async initLedger(ctx) {
    
    }

    async queryAuditoria(ctx, AuditoriaId) {
        const AudiAsBytes = await ctx.stub.getState(AuditoriaId); // get the auditoria from chaincode state
        if (!AudiAsBytes || AudiAsBytes.length === 0) {
            throw new Error(`${AuditoriaId} no existe`);
        }
        return AudiAsBytes.toString();
    }

    // id, secuencia, organizacion, ip, fecha y hora, level, facility, prioridad, mensaje, tag, hash
    async createAuditoria(ctx, id, seqblock , orblock, ipblock, tsblock, crblock, fablock, prblock, deblock, tablock, hashblock) {
        const auditoria = {
           id, seqblock, orblock, ipblock, tsblock, crblock, fablock, prblock, deblock, tablock, hashblock
        };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(auditoria)));
    }

    async queryAllAuditorias(ctx, firstId, lastId) {
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(firstId, lastId)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
}

module.exports = SysLog;
