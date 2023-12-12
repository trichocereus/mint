pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

interface IDelegateRegistry {
    function checkDelegateForContract(
        address delegate,
        address tokenOwner,
        address contractAddress,
        bytes32 permission
    ) external view returns (bool);
}

interface IERC2981 {
    function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address receiver, uint256 royaltyAmount);
}

contract testtt is ERC721, Ownable {
    using SafeMath for uint256;

    string public  PROVENANCE = "";
    uint256 public startingIndexBlock;
    uint256 public startingIndex;
    uint256 public constant price = 0.01 ether; // 0 ETH
    uint public constant maxPurchase = 2;
    uint256 public MAX_Smurfs;
    bool public saleIsActive = false;
    uint256 public REVEAL_TIMESTAMP;
    address private _royaltyRecipient;
    uint256 private _royaltyPercentage; 

   
    mapping(address => bool) public allowList1;
    mapping(address => bool) public allowList2;
    mapping(address => bool) public allowList3;
    mapping(address => uint256) public allowList4;

    address[] public allowList1Addresses;
    address[] public allowList2Addresses;
    address[] public allowList3Addresses;
    address[] public allowList4Addresses;

    bool public isPhase1Active = false;
    bool public isPhase2Active = false;
    bool public isPhase3Active = false;
    bool public isPhase4Active = false;

    mapping(address => uint256) private _mintCountPhase1;
    mapping(address => uint256) private _mintCountPhase2;
    mapping(address => uint256) private _mintCountPhase3;


    address public constant DELEGATE_REGISTRY = 0x00000000000000447e69651d841bD8D104Bed493;

    constructor(string memory name, string memory symbol, uint256 maxNftSupply, uint256 saleStart) ERC721(name, symbol) {
        MAX_Smurfs = maxNftSupply;
        REVEAL_TIMESTAMP = saleStart + (86400 * 9);
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        msg.sender.transfer(balance);
    }

    function reserve() public onlyOwner {        
        uint supply = totalSupply();
        uint i;
        for (i = 0; i < 33; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }

    // Add to allowlist for Phase 1
    function addToAllowList1(address[] memory addresses) public onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            allowList1[addresses[i]] = true;
            allowList1Addresses.push(addresses[i]);
        }
    }

    // Remove from allowlist for Phase 1
    function removeFromAllowList1(address[] memory addresses) public onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            allowList1[addresses[i]] = false;
        }
    }

    // Add to allowlist for Phase 2
    function addToAllowList2(address[] memory addresses) public onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            allowList2[addresses[i]] = true;
            allowList2Addresses.push(addresses[i]);
        }
    }

    // Remove from allowlist for Phase 2
    function removeFromAllowList2(address[] memory addresses) public onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            allowList2[addresses[i]] = false;
        }
    }

    // Add to allowlist for Phase 3
    function addToAllowList3(address[] memory addresses) public onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            allowList3[addresses[i]] = true;
            allowList3Addresses.push(addresses[i]);
        }
    }

    // Remove from allowlist for Phase 3
    function removeFromAllowList3(address[] memory addresses) public onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            allowList3[addresses[i]] = false;
            // Find and remove the address from the allowList3Addresses array
            for (uint j = 0; j < allowList3Addresses.length; j++) {
                if (allowList3Addresses[j] == addresses[i]) {
                    // Swap with the last element
                    allowList3Addresses[j] = allowList3Addresses[allowList3Addresses.length - 1];
                    // Remove the last element
                    allowList3Addresses.pop();
                    break; // Assuming each address appears only once in the array
                }
            }
        }
    }

    // Add to allowList4
    function addToAllowList4(address[] memory addresses) public onlyOwner {
            for (uint i = 0; i < addresses.length; i++) {
                allowList4[addresses[i]] = 0;
                allowList4Addresses.push(addresses[i]);
            }
        }

    // Remove from allowList4
    function removeFromAllowList4(address[] memory addresses) public onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            if (allowList4[addresses[i]] > 0) {
                allowList4[addresses[i]] -= 1;
            }
        }
    }
    function setRevealTimestamp(uint256 revealTimeStamp) public onlyOwner {
        REVEAL_TIMESTAMP = revealTimeStamp;
    } 

    function setProvenanceHash(string memory provenanceHash) public onlyOwner {
        PROVENANCE = provenanceHash;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _setBaseURI(baseURI);
    }

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    // Activate Phase 1
    function activatePhase1() public onlyOwner {
        isPhase1Active = true;
    }

    // Deactivate Phase 1
    function deactivatePhase1() public onlyOwner {
        isPhase1Active = false;
    }

    // Activate Phase 2
    function activatePhase2() public onlyOwner {
        isPhase2Active = true;
    }

    // Deactivate Phase 2
    function deactivatePhase2() public onlyOwner {
        isPhase2Active = false;
    }

    // Activate Phase 3
    function activatePhase3() public onlyOwner {
        isPhase3Active = true;
    }

    // Deactivate Phase 3
    function deactivatePhase3() public onlyOwner {
        isPhase3Active = false;
    }

    function mint(uint numberOfTokens) public payable {
    require(saleIsActive, "Sale must be active to mint");
    require(totalSupply().add(numberOfTokens) <= MAX_Smurfs, "Purchase would exceed max supply");
    address tokenOwner;
    address minter = msg.sender;

     if (msg.sender != tokenOwner) {
        bool isDelegated = IDelegateRegistry(DELEGATE_REGISTRY).checkDelegateForContract(
            msg.sender,
            tokenOwner,
            address(this),
            ""
        );
        for (uint i = 0; i < allowList1Addresses.length; i++) {
            if (IDelegateRegistry(DELEGATE_REGISTRY).checkDelegateForContract(
                msg.sender,
                allowList1Addresses[i],
                address(this),
                "")) {
                tokenOwner = allowList1Addresses[i];
                minter = tokenOwner;
                break;
            }
        }
        for(uint i = 0; i < allowList2Addresses.length; i++) {
            if (IDelegateRegistry(DELEGATE_REGISTRY).checkDelegateForContract(
                msg.sender,
                allowList2Addresses[i],
                  address(this),
                "")) {
                tokenOwner = allowList2Addresses[i];
                minter = tokenOwner;
                break;
            }
        }
        for (uint i = 0; i < allowList3Addresses.length; i++) {
            if (IDelegateRegistry(DELEGATE_REGISTRY).checkDelegateForContract(
                msg.sender,
                allowList3Addresses[i],
                address(this),
                "")) {
                tokenOwner = allowList3Addresses[i];
                minter = tokenOwner;
                break;
            }
        }
        
        for (uint i = 0; i < allowList4Addresses.length; i++) {
            if (IDelegateRegistry(DELEGATE_REGISTRY).checkDelegateForContract(
                msg.sender,
                allowList4Addresses[i],
                address(this),
                "")) {
                tokenOwner = allowList4Addresses[i];
                minter = tokenOwner;
                break;
            }
        }
    }
    
    if (isPhase1Active && (allowList1[minter] || allowList2[minter])) {
        uint256 allowedMints = (allowList1[minter] ? 2 : 0) + (allowList2[minter] ? 1 : 0);
        require(_mintCountPhase1[minter].add(numberOfTokens) <= allowedMints, "Exceeds max allowed in Phase 1");
        _mintCountPhase1[minter] = _mintCountPhase1[minter].add(numberOfTokens);
    } else if (isPhase2Active && allowList3[minter]) {
        require(totalSupply().add(numberOfTokens) <= 3000, "Phase 2 limit exceeded");
        require(_mintCountPhase2[minter].add(numberOfTokens) <= 1, "Exceeds max allowed in Phase 2");
        _mintCountPhase2[minter] = _mintCountPhase2[minter].add(numberOfTokens);
    } else if (isPhase3Active && allowList4[minter] > 0) {
        require(msg.value >= price * numberOfTokens, "Ether value sent is not correct for Phase 3");
        _mintCountPhase3[minter] = _mintCountPhase3[minter].add(numberOfTokens);
        allowList4[minter] -= 1; // Reduce the count after minting
    } else {
        revert("Not eligible for minting in current phase");
    }

    for (uint i = 0; i < numberOfTokens; i++) {
        if (totalSupply() < MAX_Smurfs) {
            _safeMint(minter, totalSupply());
        }
    }
    }

function checkMintEligibility(address user) public view returns (string[] memory phases, uint256[] memory allowedMints) {
    phases = new string[](4); // Assuming there are 4 phases
    allowedMints = new uint256[](4);

    // Check eligibility for Phase 1
    if (allowList1[user] || allowList2[user]) {
        phases[0] = "Phase 1";
        allowedMints[0] = (allowList1[user] ? 2 : 0) + (allowList2[user] ? 1 : 0) - _mintCountPhase1[user];
    } else {
        phases[0] = "Not eligible for Phase 1";
        allowedMints[0] = 0;
    }

    // Check eligibility for Phase 2
    if (allowList3[user]) {
        phases[1] = "Phase 2";
        allowedMints[1] = 1 - _mintCountPhase2[user];
    } else {
        phases[1] = "Not eligible for Phase 2";
        allowedMints[1] = 0;
    }

    // Check eligibility for Phase 3
    if (allowList4[user] > 0) {
        phases[2] = "Phase 3";
        allowedMints[2] = allowList4[user] - _mintCountPhase3[user];
    } else {
        phases[2] = "Not eligible for Phase 3";
        allowedMints[2] = 0;
    }

    return (phases, allowedMints);
}




    function setStartingIndex() public {
        require(startingIndex == 0, "Starting index is already set");
        require(startingIndexBlock != 0, "Starting index block must be set");
        
        startingIndex = uint(blockhash(startingIndexBlock)) % MAX_Smurfs;
        if (block.number.sub(startingIndexBlock) > 255) {
            startingIndex = uint(blockhash(block.number - 1)) % MAX_Smurfs;
        }
        if (startingIndex == 0) {
            startingIndex = startingIndex.add(1);
        }
    }

    function setRoyaltyInfo(address recipient, uint256 percentage) public onlyOwner {
        _royaltyRecipient = recipient;
        _royaltyPercentage = percentage;
    }

function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address receiver, uint256 royaltyAmount) {
        uint256 royalty = (salePrice * _royaltyPercentage) / 10000;
        return (_royaltyRecipient, royalty);
    }

    function emergencySetStartingIndexBlock() public onlyOwner {
        require(startingIndex == 0, "Starting index is already set");
        
        startingIndexBlock = block.number;
    }
}