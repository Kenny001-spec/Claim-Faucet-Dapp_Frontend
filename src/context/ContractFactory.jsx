import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import useContractInstance from "../hooks/useContractInstance";

const FaucetContext = createContext({
  faucets: [],
  userFaucets: [],
  totalContracts: 0,
  getTokenInfo: async () => {},
  claimFaucet: async () => {},
  getUserFaucetBalance: async () => {},
  getBalanceFromDeployedContract: async () => {},
});

export const FaucetProvider = ({ children }) => {
  const [faucets, setFaucets] = useState([]);
  const [userFaucets, setUserFaucets] = useState([]);
  const [totalContracts, setTotalContracts] = useState(0);

  const readContract = useContractInstance();

  const fetchAllFaucets = useCallback(async () => {
    if (!readContract) return;
    try {
      const allContracts = await readContract.getAllContractDeployed();
      console.log("Fetched all deployed faucets:", allContracts);

      const formattedResponses = allContracts.map((entry) => {
        return {
          deployer: entry[0],
          contract: entry[1],
        };
      });

      setFaucets(formattedResponses);
    } catch (error) {
      console.error("Error fetching all faucets", error);
    }
  }, [readContract]);

  const fetchUserFaucets = useCallback(async () => {
    if (!readContract) return;
    try {
      const userContracts = await readContract.getUserDeployedContractByIndex();

      setUserFaucets(userContracts);
    } catch (error) {
      console.error("Error fetching user faucets", error);
    }
  }, [readContract]);

  const fetchTotalContracts = useCallback(async () => {
    if (!readContract) return;
    try {
      const total = await readContract.getLengthOfDeployedContract();

      setTotalContracts(parseInt(total));
    } catch (error) {
      console.error("Error fetching total contracts", error);
    }
  }, [readContract]);

  const getTokenInfo = useCallback(
    async (contractAddress) => {
      if (!readContract) return;
      try {
        const [name, symbol] = await readContract.getInfoContract(
          contractAddress
        );

        return { name, symbol };
      } catch (error) {
        console.error("Error fetching token info", error);
      }
    },
    [readContract]
  );

  const claimFaucet = useCallback(
    async (contractAddress) => {
      if (!readContract) return;
      try {
        const txn = await readContract.claimFaucetFromContract(contractAddress);
        const receipt = await txn.wait();
        console.log("Faucet claimed successfully:", receipt);
      } catch (error) {
        console.error("Error claiming faucet", error);
      }
    },
    [readContract]
  );

  const getUserFaucetBalance = useCallback(
    async (contractAddress) => {
      if (!readContract) return;
      try {
        const balance = await readContract.getBalanceFromDeployedContract(
          contractAddress
        );
        console.log(
          `Fetched faucet balance for ${contractAddress}:`,
          balance.toString()
        );
        return balance;
      } catch (error) {
        console.error("Error fetching faucet balance", error);
      }
    },
    [readContract]
  );

  const getBalanceFromDeployedContract = useCallback(
    async (contractAddress) => {
      if (!readContract) return;
      try {
        const balance = await readContract.getBalanceFromDeployedContract(
          contractAddress
        );
        console.log(
          `Fetched faucet balance for ${contractAddress}:`,
          balance.toString()
        );
        return balance;
      } catch (error) {
        console.error("Error fetching faucet balance", error);
      }
    },
    [readContract]
  );

  useEffect(() => {
    fetchAllFaucets();
    fetchUserFaucets();
    fetchTotalContracts();
  }, [fetchAllFaucets, fetchUserFaucets, fetchTotalContracts]);

  return (
    <FaucetContext.Provider
      value={{
        faucets,
        userFaucets,
        totalContracts,
        getTokenInfo,
        claimFaucet,
        getUserFaucetBalance,
        getBalanceFromDeployedContract,
      }}
    >
      {children}
    </FaucetContext.Provider>
  );
};

export const useFaucet = () => useContext(FaucetContext);
