pragma solidity ^0.8.18;
import "./../../oracle/IPriceFeed.sol";
interface IExOraclePriceData
{
    function latestRoundData(string calldata priceType, address dataSource) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
    function get(string calldata priceType, address source) external view returns (uint256 price, uint256 timestamp);
    function getOffchain(string calldata priceType, address source) external view returns (uint256 price, uint256 timestamp);
    function getCumulativePrice(string calldata priceType, address source) external view returns (uint256 cumulativePrice,uint32 timestamp);
    function lastResponseTime(address source) external view returns (uint256);
}

contract PriceFeedToken is IPriceFeed {   
    address public exOracleAddress;
    address public dataSource;
    string public priceType;
    
     /**
     * Input an ExOracle contract address
     */
    constructor(address _oracle, address _dataSource, string memory _priceType) public {
        exOracleAddress = _oracle;
        dataSource = _dataSource;
        priceType = _priceType;
    }

    function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        IExOraclePriceData oracle = IExOraclePriceData(exOracleAddress);
        return oracle.latestRoundData(priceType, dataSource);
    }
}