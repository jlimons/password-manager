# Gestor de contraseñas

> Este sistema almacena localmente cuentas y contraseñas de manera cifrada.

## Tabla de contenido
* [Información general](#información-general)
* [Teconogías](#teconogías)
* [Instalación](#instalación)
* [Ejecución](#ejecución)
* [Características](#características)
* [Contacto](#contacto)


## Información general

A través de un CLI (Command Line Interface), el usuario podrá cifrar todas las cuentas y contraseñas que desee. Los datos se cifran con el algoritmo AES (Advanced Encryption Standard) por lo que el usuario tendrá una contraseña maestra para cifrar y decifrar los datos almacenados.  

La contraseña maestra se almacena como una cadena hash SHA-256. Es decir, aunque el archivo almacenado sea vulnerado, el intruso no podrá ver la contraseña maestra para decifrar las cuentas almacenadas. 

!(./aes.png)

## Teconogías
* Node.js - version >= 8

## Instalación
```console
# npm
> npm install
> 

# or yarn
> yarn
>
```

## Ejecución
```console
> node index.js
```

## Características
* Agrega cuentas y contraseñas
* Edita datos existentes
* Muestra el nivel de seguridad de cada password

Por implementar:
* Cambiar contraseña maestra

## Contacto
Creado por [@jlimons](https://www.jalisa.xyz/)
