/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');

const registerUser = async (user, res) => {
    try {

        const ccpPath = path.resolve(__dirname, 'config.json');

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), './network/wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(user);
        if (userExists) {
            res.status(400).send({
                mensaje: 'Una identidad con este usuario ya existe',
                status: false
            });
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            res.status(400).send({
                mensaje: 'La identidad del admin no se encuentra en la billetera para poder inscribir un usuario',
                status: false
            });
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: user, role: 'client' }, adminIdentity);
        const enrollment = await ca.enroll({ enrollmentID: user, enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('Org1MSP', enrollment.certificate, enrollment.key.toBytes());
        await wallet.import(user, userIdentity);
        res.status(201).send({
            mensaje: `El usuario '${user}' se inscribio satisfactoriamente en la red y se guardo en la billetera`,
            status: true
        });

    } catch (error) {
        res.status(500).send({
            mensaje: `Error al registrar el usuario": ${error}`,
            status: false
        });
    }
}

module.exports = {
    registerUser
}

