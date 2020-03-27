/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const queryAuditoria = async ( auditoriaId, user, res ) => {
    try {
        // cagamos la configuracion de la red
        const ccpPath = path.resolve(__dirname, 'config.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // creamos un nuevo archivo basado en la wallet para manejar identidades
        const walletPath = path.join(process.cwd(), './network/wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // verificamos si el usuario ya esta inscripto en la wallet
        const identity = await wallet.get(user);
        if (!identity) {
            res.status(400).send({
                mensaje: `La identidad para el usuario '${user}' no existe, por favor registrese`,
                status: true
            });
            console.log('La identidad para el user1 no existe en la wallet');
            return;
        }

        // creamos un nuevo gateway para conectar con nuestro peer
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryAuditoria', 'A'+auditoriaId);

        res.status(200).send({
            mensaje: `consulta realizada con exito`,
            registro: JSON.parse(result.toString()),
            status: true
        });

    } catch (error) {
        res.status(500).send({
            mensaje: `Error al enviar la transaccion: ${error}`,
            status: true
        });
        console.error(`Error el la transaccion: ${error}`);
    }
}

const queryAllAuditorias = async ( user, res) => {
    try {
        const ccpPath = path.resolve(__dirname, 'config.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), './network/wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get(user);
        if (!identity) {
            res.status(400).send({
                mensaje: `La identidad para el usuario '${user}' no existe, por favor registrese`,
                status: true
            });
            console.log('La identidad para el user1 no existe en la wallet');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user, discovery: { enabled: true, asLocalhost: true } });

        const network = await gateway.getNetwork('mychannel');

        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryAllAuditorias', 'A0', 'A999');

        res.status(200).send({
            mensaje: `consulta realizada con exito`,
            registros: JSON.parse(result.toString()),
            status: true
        });

    } catch (error) {
        res.status(500).send({
            mensaje: `Error al enviar la transaccion: ${error}`,
            status: true
        });
        console.error(`Error el la transaccion: ${error}`);
    }
}

module.exports = {
    queryAuditoria,
    queryAllAuditorias
}

