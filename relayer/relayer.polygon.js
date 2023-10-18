const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const web3 = new Web3("wss://sepolia.infura.io/ws/v3/4deeeb247d9d440dbf6182a57a2782a1")

const provider = new HDWalletProvider(
    "forest discover addict zoo recall sustain swamp enough vessel chuckle oxygen wrestle",
    "https://polygon-mumbai.infura.io/v3/4deeeb247d9d440dbf6182a57a2782a1")
const web3ForPolygon = new Web3(provider)

const POLYGON_ABI = require("../abi/aust.polygon.abi.json")
const ETHEREUM_ABI = require("../abi/aust.ethereum.abi.json")

const contractAddressForEthereum = "0xBd2898c5c64fcfc8fA5BB30d3f4cE7242Fc19FE4"
const contractAddressForPolygon = "0x3dCD29B24cbF56170E84E7dda3d2a8C4add03606"

function addressPadding(address) {
    try {
        address = address.substring(2)
        const cleaned = address.replace(/^0+/, '')
        const finalString = cleaned.padStart(40, '0');
        return "0x" + finalString

    } catch (e) {
        throw e
    }
}

async function main() {
    try {
        const polContract = new web3ForPolygon.eth.Contract(POLYGON_ABI, contractAddressForPolygon);
        const ethContract = new web3.eth.Contract(ETHEREUM_ABI, contractAddressForEthereum);

        const accounts = await web3.eth.getAccounts()

        console.log("Listening for Burn events on Polygon")

        const burnEvents = await web3ForPolygon.eth.subscribe('logs', {
            address: contractAddressForPolygon,
            topics: [web3.utils.sha3('Burn(address,uint256)')]
        })

        burnEvents.on('data', async (event) => {

            console.log(addressPadding(event.topics[1]), BigInt(event.data))

            await ethContract.methods.mint(addressPadding(event.topics[1]), BigInt(event.data))
                .send({from: accounts[0]});

            console.log("Minted on Ethereum")

        })
    } catch (e) {
        throw e
    }


// const ethBurnEvents = await ethContract.events.Burn()
// ethBurnEvents.on('data', async (event) => {
//         console.log("Received burn event on Ethereum")
//         console.log(event.returnValues)
//     }
// )
}

;(async () => {
    try {
        await main()
    } catch (e) {
        console.log(e)
    }
})()
