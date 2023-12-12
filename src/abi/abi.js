[
    "_format": "hh-sol-artifact-1",
    "contractName": "SmurfCat",
    "sourceName": "contracts/SmurfCat.sol",
    "abi": [
    {
     "inputs": [],
     "name": "activatePhase1",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "activatePhase2",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "activatePhase3",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address[]",
       "name": "addresses",
       "type": "address[]"
      }
     ],
     "name": "addToAllowList1",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address[]",
       "name": "addresses",
       "type": "address[]"
      }
     ],
     "name": "addToAllowList2",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address[]",
       "name": "addresses",
       "type": "address[]"
      }
     ],
     "name": "addToAllowList3",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "address[]",
       "name": "addresses",
       "type": "address[]"
      }
     ],
     "name": "addToAllowList4",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "deactivatePhase1",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "flipSaleState",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "string",
       "name": "name",
       "type": "string"
      },
      {
       "internalType": "string",
       "name": "symbol",
       "type": "string"
      },
      {
       "internalType": "uint256",
       "name": "maxNftSupply",
       "type": "uint256"
      },
      {
       "internalType": "uint256",
       "name": "saleStart",
       "type": "uint256"
      }
     ],
     "stateMutability": "nonpayable",
     "type": "constructor"
    },
    {
     "anonymous": false,
     "inputs": [
      {
       "indexed": true,
       "internalType": "address",
       "name": "owner",
       "type": "address"
      },
      {
       "indexed": true,
       "internalType": "address",
       "name": "approved",
       "type": "address"
      },
      {
       "indexed": true,
       "internalType": "uint256",
       "name": "tokenId",
       "type": "uint256"
      }
     ],
     "name": "Approval",
     "type": "event"
    },
    {
     "anonymous": false,
     "inputs": [
      {
       "indexed": true,
       "internalType": "address",
       "name": "owner",
       "type": "address"
      },
      {
       "indexed": true,
       "internalType": "address",
       "name": "operator",
       "type": "address"
      },
      {
       "indexed": false,
       "internalType": "bool",
       "name": "approved",
       "type": "bool"
      }
     ],
     "name": "ApprovalForAll",
     "type": "event"
    },
    {
     "inputs": [
      {
       "internalType": "address",
       "name": "to",
       "type": "address"
      },
      {
       "internalType": "uint256",
       "name": "tokenId",
       "type": "uint256"
      }
     ],
     "name": "approve",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "deactivatePhase2",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "deactivatePhase3",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [],
     "name": "emergencySetStartingIndexBlock",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "uint256",
       "name": "numberOfTokens",
       "type": "uint256"
      }
     ],
     "name": "mint",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
    },
    {
     "anonymous": false,
     "inputs": [
      {
       "indexed": true,
       "internalType": "address",
       "name": "previousOwner",
       "type": "address"
      },
      {
       "indexed": true,
       "internalType": "address",
       "name": "newOwner",
       "type": "address"
      }
     ],
     "name": "OwnershipTransferred",
     "type": "event"
    },
    {
     "inputs": [
      {
       "internalType": "address[]",
       "name": "addresses",
       "type": "address[]"
      }
     ],
     "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
    {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
    }
    ],
    "name": "tokenByIndex",
    "outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
    {
        "internalType": "address",
        "name": "owner",
        "type": "address"
    },
    {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
    }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
    {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }
    ],
    "name": "tokenURI",
    "outputs": [
    {
        "internalType": "string",
        "name": "",
        "type": "string"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
    {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }
    ],
    "stateMutability": "view",
    "type": "function"
    }
    ]
]