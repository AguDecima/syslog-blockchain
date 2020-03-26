/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const md5 = require('js-md5');

const createAuditoria = async (auditoria, user, res) => {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, 'config.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), './network/wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('user1');
        if (!identity) {
            console.log('La identidad para el user1 no existe en la wallet');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('syslog');

        //id, seqblock , orblock, ipblock, tsblock, crblock, fablock, prblock, deblock, tablock, hashblock


        await contract.submitTransaction('createAuditoria', auditoria.id, auditoria.seqblock, auditoria.ipblock, 
        auditoria.tsblock, auditoria.crblock, auditoria.crblock, auditoria.fablock, auditoria.prblock, auditoria.deblock,
        auditoria.tablock, md5(JSON.stringify(auditoria)));
        console.log('La transaccion ha sid enviada');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Error al enviar la transaccion: ${error}`);
        process.exit(1);
    }
}

module.exports = {
    createAuditoria
}
