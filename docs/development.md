# Setting up Development Environment

## Install Node.js

Install Node.js by your favorite method, or use Node Version Manager by following directions at https://github.com/creationix/nvm

```bash
nvm install v4
```

## Fork and Download Repositories

To develop ARDcore-node:

```bash
cd ~
git clone git@github.com:<yourusername>/ARDcore-node.git
git clone git@github.com:<yourusername>/ARDcore-lib.git
```

To develop ARD or to compile from source:

```bash
git clone git@github.com:<yourusername>/ARD.git
git fetch origin <branchname>:<branchname>
git checkout <branchname>
```
**Note**: See ARD documentation for building ARD on your platform.


## Install Development Dependencies

For Ubuntu:
```bash
sudo apt-get install libzmq3-dev
sudo apt-get install build-essential
```
**Note**: Make sure that libzmq-dev is not installed, it should be removed when installing libzmq3-dev.


For Mac OS X:
```bash
brew install zeromq
```

## Install and Symlink

```bash
cd ARDcore-lib
npm install
cd ../ARDcore-node
npm install
```
**Note**: If you get a message about not being able to download ARD distribution, you'll need to compile ARDd from source, and setup your configuration to use that version.


We now will setup symlinks in `ARDcore-node` *(repeat this for any other modules you're planning on developing)*:
```bash
cd node_modules
rm -rf ARDcore-lib
ln -s ~/ARDcore-lib
rm -rf ARDd-rpc
ln -s ~/ARDd-rpc
```

And if you're compiling or developing ARD:
```bash
cd ../bin
ln -sf ~/ARD/src/ARDd
```

## Run Tests

If you do not already have mocha installed:
```bash
npm install mocha -g
```

To run all test suites:
```bash
cd ARDcore-node
npm run regtest
npm run test
```

To run a specific unit test in watch mode:
```bash
mocha -w -R spec test/services/ARDd.unit.js
```

To run a specific regtest:
```bash
mocha -R spec regtest/ARDd.js
```

## Running a Development Node

To test running the node, you can setup a configuration that will specify development versions of all of the services:

```bash
cd ~
mkdir devnode
cd devnode
mkdir node_modules
touch ARDcore-node.json
touch package.json
```

Edit `ARDcore-node.json` with something similar to:
```json
{
  "network": "livenet",
  "port": 3001,
  "services": [
    "ARDd",
    "web",
    "insight-api",
    "insight-ui",
    "<additional_service>"
  ],
  "servicesConfig": {
    "ARDd": {
      "spawn": {
        "datadir": "/home/<youruser>/.ARDd",
        "exec": "/home/<youruser>/ARD/src/ARDd"
      }
    }
  }
}
```

**Note**: To install services [insight-api](https://github.com/underdarkskies/insight-api) and [insight-ui](https://github.com/underdarkskies/insight-ui) you'll need to clone the repositories locally.

Setup symlinks for all of the services and dependencies:

```bash
cd node_modules
ln -s ~/ARDcore-lib
ln -s ~/ARDcore-node
ln -s ~/insight-api
ln -s ~/insight-ui
```

Make sure that the `<datadir>/ARD.conf` has the necessary settings, for example:
```
server=1
whitelist=127.0.0.1
txindex=1
addressindex=1
timestampindex=1
spentindex=1
zmqpubrawtx=tcp://127.0.0.1:28332
zmqpubhashblock=tcp://127.0.0.1:28332
rpcallowip=127.0.0.1
rpcuser=ARD
rpcpassword=local321
```

From within the `devnode` directory with the configuration file, start the node:
```bash
../ARDcore-node/bin/ARDcore-node start
```
