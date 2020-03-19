/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

export const enrollAdmin = async () => {
    try {
        // cargamos la configuracion de la red
        const ccpPath = path.resolve(__dirname,'config.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // creamos una nueva CA cliente para interactuar con la CA.
        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // creamos un nuevo archivo basado en la wallet para manejar identidades
        const walletPath = path.join(__dirname, 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // verificamos si el administrador ya esta registrado en la wallet
        const identity = await wallet.get('admin');
        if (identity) {
            console.log('Una identidad para el administrador ya esxiste en la wallet');
            return;
        }

        // inscribimos el usuario admin y lo importamos a nuestra wallet
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put('admin', x509Identity);
        console.log('Se inscribio el usuario admin exitosamente y se lo importo a la billetera');

    } catch (error) {
        console.error(`Fallo al inscribir el usuario "admin": ${error}`);
        process.exit(1);
    }
}