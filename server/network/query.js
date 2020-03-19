/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

export const queryAuditoria = async ( auditoriaId ) => {
    try {
        // cagamos la configuracion de la red
        const ccpPath = path.resolve(__dirname, 'config.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // creamos un nuevo archivo basado en la wallet para manejar identidades
        const walletPath = path.join(__dirname, 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // verificamos si el usuario ya esta inscripto en la wallet
        const identity = await wallet.get('user1');
        if (!identity) {
            console.log('La identidad para el user1 no existe en la wallet');
            return;
        }

        // creamos un nuevo gateway para conectar con nuestro peer
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('syslog');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryAuditoria', auditoriaId);
        console.log(`La transaccion ha sido evaluada, el resultado es: ${result.toString()}`);

    } catch (error) {
        console.error(`Error el la transaccion: ${error}`);
        process.exit(1);
    }
}

export const queryAllAuditorias = async ( firstId, lastId) => {
    try {
        const ccpPath = path.resolve(__dirname, 'config.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(__dirname, 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get('user1');
        if (!identity) {
            console.log('La identidad para el user1 no existe en la wallet');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });

        const network = await gateway.getNetwork('mychannel');

        const contract = network.getContract('syslog');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryAllAuditorias', firstId, lastId);
        console.log(`La transaccion ha sido evaluada, el resultado es: ${result.toString()}`);

    } catch (error) {
        console.error(`Error el la transaccion: ${error}`);
        process.exit(1);
    }
}