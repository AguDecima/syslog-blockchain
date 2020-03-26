/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

const registerUser = async (user, res) => {
    try {
        // cargamos la configuracion de la red
        const ccpPath = path.resolve(__dirname,'config.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

         // creamos una nueva CA cliente para interactuar con la CA.
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);

        // creamos un nuevo archivo basado en la wallet para manejar identidades
        const walletPath = path.join(process.cwd(), './network/wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // verificamos si el usuario ya existe en la wallet
        const userIdentity = await wallet.get('user2');
        if (userIdentity) {
            console.log('Una identidad con este usuario ya existe');
            return;
        }

        // verificamos si el usuario admin ya se encuentra inscripto
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // construimos un objeto ususario para autenticarse con el CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // registramos y inscribimos el usuario, ademas lo metemos en la wallet
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: 'user2',
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: 'user2',
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put('user2', x509Identity);
        console.log('El usuario se inscribio satisfactoriamente');

    } catch (error) {
        console.error(`Error al registrar el usuario": ${error}`);
        process.exit(1);
    }
}

module.exports = {
    registerUser
}

