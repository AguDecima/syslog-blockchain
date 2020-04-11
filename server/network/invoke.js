/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, FileSystemWallet } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const md5 = require('md5');

const createAuditoria = async (auditoria, user, res) => {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, 'config.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), './network/wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.exists(user);
        if (!identity) {
            res.status(400).send({
                mensaje: `La identidad para el usuario '${user}' no existe, por favor registrese`,
                status: false
            });
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // generamos hash con bcrypt
        const bcrypt = require('bcrypt');   
        const saltRounds = 10;

        let fecha = new Date(auditoria.tsblock)

        let auditoriaHash = {
            id: auditoria.id,
            seqblock: auditoria.seqblock, orblock: auditoria.orblock,
            ipblock: auditoria.ipblock, tsblock: fecha.toString(),
            crblock: auditoria.crblock, fablock: auditoria.fablock,
            prblock: auditoria.prblock, deblock: auditoria.deblock,
            tablock: auditoria.tablock
        }

        console.log(auditoriaHash)

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(JSON.stringify(auditoriaHash), salt);

        //id, seqblock , orblock, ipblock, tsblock, crblock, fablock, prblock, deblock, tablock, hashblock
        await contract.submitTransaction('createAuditoria', auditoria.id, auditoria.seqblock, auditoria.orblock, auditoria.ipblock, 
        auditoria.tsblock, auditoria.crblock, auditoria.fablock, auditoria.prblock, auditoria.deblock,
        auditoria.tablock, hash );

        auditoria.hashblock = hash

        res.status(201).send({
            mensaje: `El registro se guardo correctamente`,
            registro: auditoria,
            status: true
        });

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        res.status(500).send({
            mensaje: `Error al enviar la transaccion: ${error}`,
            status: false
        });
        console.error(`Error al enviar la transaccion: ${error}`);
    }
}

module.exports = {
    createAuditoria
}
