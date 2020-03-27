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
        const userIdentity = await wallet.get(user);
        if (userIdentity) {
            res.status(400).send({
                mensaje: 'Una identidad con este usuario ya existe',
                status: false
            });
            return;
        }

        // verificamos si el usuario admin ya se encuentra inscripto
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            res.status(400).send({
                mensaje: 'La identidad del admin no se encuentra en la billetera para poder inscribir un usuario',
                status: false
            });
            return;
        }

        // construimos un objeto ususario para autenticarse con el CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // registramos y inscribimos el usuario, ademas lo metemos en la wallet
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: user,
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: user,
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
        await wallet.put(user, x509Identity);
        res.status(201).send({
            mensaje: `El usuario '${user}' se inscribio satisfactoriamente en la red y se guardo en la billetera`,
            status: true
        });

    } catch (error) {
        res.status(500).send({
            mensaje: `Error al registrar el usuario": ${error}`,
            status: true
        });
    }
}

module.exports = {
    registerUser
}

