/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

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
    async createAuditoria(ctx, id, seqblock, orblock, ipblock, tsblock, crblock, fablock, prblock, deblock, tablock, hashblock) {
        const auditoria = {
            id, seqblock, orblock, ipblock, tsblock, crblock, fablock, prblock, deblock, tablock, hashblock
        };
        await ctx.stub.putState(id.toString() + orblock.toString() + ipblock.toString() , Buffer.from(JSON.stringify(auditoria)));
    }

    async queryAllAuditorias(ctx, startKey, endKey) {

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }


}

module.exports = FabCar;
