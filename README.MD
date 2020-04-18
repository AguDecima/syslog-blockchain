## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._


### Pre-requisitos 📋

_Que cosas necesitas para instalar el software_

* [Node JS](https://nodejs.org/es/)
* [MySQL](https://www.mysql.com/)
* [Git](https://git-scm.com/)
* [Workbench](https://www.mysql.com/products/workbench/)
* [Docker](https://www.docker.com/)


### Instalación 🔧

_CONFIGURANDO LA RED PARA BLOCKCHAIN_

```
Para configurar y generar la red de blockchain se debera seguir el siguiente tutorial(https://hyperledger-fabric.readthedocs.io/en/release-1.4/write_first_app.html), 
deberemos instalar nuestro chaincode ubicado en la carpeta contract/lib/fabcar.js y correrlo desde 
el proyecto que nos provee el tutorial. Finalmente deberamos copiar el archivo de conexion 
(first-network/connection-org1.json) que genera la red y copiarlo en nuestro proyecto en el 
archivo ubicado en server/network/config.json.
```

_BACKEND Y FRONTEND: NODE JS - EXPRESS-JS - REACT JS_
```
para poder correr el back-end y el front-end es necesario tener instalado node js, 
al descargar las carperas debera estar en la raiz de la carpeta server y correr 
el comando 'npm i' para instalar las dependencias
```

_BASE DE DATOS: MYSQL_

```
Debera instalar la ultima version de mysql, y configurar el usuario y contraseña 
(usuario:root, contraseña:root1234), luego ingresar a Workbench y crear una base 
de datos con el nombre de 'syslog' y ejecutar el script 'syslog.sql' 
que se encuentra en la carpera 'bd' del proyecto.
```

_PARA FINALIZAR_

```
Una vez finalizado todos estos pasos esta en condicones de correr el sistema,
para el backend correr el comando 'npm start' (desde la raiz), y para el front-end 
'yarn start'. Luego acceder a la direccion http://localhost:5000/enrol-admin para registra el 
admin de la red y añadirlo en la wallet.Finalmente acceder al sistema ingresar en
 http://localhost:3000/ con el usuario : admin y password : admin
```

## Construido con 🛠️

* [React JS](https://es.reactjs.org/) - El framework web usado
* [Mysql](https://www.postgresql.org/) - Base de datos
* [Express JS](https://expressjs.com/es/) - Usado para el backend
* [Blockchain](https://hyperledger-fabric.readthedocs.io/en/release-1.4/) - Hyper Ledger - Blockchain



    

            