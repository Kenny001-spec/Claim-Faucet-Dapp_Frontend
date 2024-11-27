// import React, { useEffect, useState } from "react";
// import { useFaucet } from "../context/ContractFactory";
// import { useAppKitAccount } from "@reown/appkit/react";

// const Faucets = () => {
//   const { address } = useAppKitAccount();
//   const {
//     faucets,
//     userFaucets,
//     totalContracts,
//     getTokenInfo,
//     claimFaucet,
//     getBalanceFromDeployedContract,
//   } = useFaucet();

//   const [tokenInfos, setTokenInfos] = useState({});
//   const [balances, setBalances] = useState({});

//   useEffect(() => {
//     faucets.forEach(async (faucet) => {
//       await handleGetTokenInfo(faucet.contract);
//     });
//   }, [faucets, userFaucets, totalContracts, address]);

//   const handleClaim = async (contractAddress) => {
//     await claimFaucet(contractAddress);
//   };

//   const handleGetTokenInfo = async (contractAddress) => {
//     const info = await getTokenInfo(contractAddress);
//     setTokenInfos((prevInfos) => ({
//       ...prevInfos,
//       [contractAddress]: info,
//     }));
//   };

//   const handleGetBalance = async (contractAddress) => {
//     try {
//       const balance = await getBalanceFromDeployedContract(contractAddress);
//       setBalances((prevBalances) => ({
//         ...prevBalances,
//         [contractAddress]: balance.toString(),
//       }));
      
//       console.log(`Balance updated for ${contractAddress}: ${balance}`);
//     } catch (error) {
//       console.error("Error getting balance:", error);
      
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-6">
//       <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
//         Faucet Dashboard
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//         {faucets.map((faucet, index) => {
//           const isDeployer =
//             address?.toLowerCase() === faucet.deployer.toLowerCase();
//           const tokenInfo = tokenInfos[faucet.contract];

//           return (
//             <div
//               key={index}
//               className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between h-full"
//             >
//               <div>
//                 <div className="flex items-start justify-between mb-4">
//                   <h2 className="text-2xl font-semibold text-gray-900">
//                     {tokenInfo?.name || `Faucet ${index + 1}`}
//                   </h2>
//                   <button
//                     onClick={() =>
//                       isDeployer
//                         ? handleGetBalance(faucet.contract)
//                         : handleClaim(faucet.contract)
//                     }
//                     className="w-20 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300 transition-colors"
//                     aria-label={isDeployer ? "Get Balance" : "Claim Tokens"}
//                   >
//                     <span className="sr-only">
//                       {isDeployer ? "Get Balance" : "Claim Tokens"}
//                     </span>
//                     {isDeployer ? "💰" : "🪙"}
//                   </button>
//                 </div>
//                 <p className="text-lg text-gray-600 mb-4">
//                   {tokenInfo?.symbol || "Loading..."}
//                 </p>
//                 {balances[faucet.contract] && (
//                   <p className="text-sm text-gray-600 mt-2">
//                     <span className="font-semibold">Balance:</span>{" "}
//                     {balances[faucet.contract]}
//                   </p>
//                 )}
//                 <div className="text-sm text-gray-600 mb-4">
//                   <p className="mb-1">
//                     <span className="font-semibold">Contract:</span>{" "}
//                     {faucet.contract}
//                   </p>
//                   {isDeployer && (
//                     <p>
//                       <span className="font-semibold">Deployer:</span>{" "}
//                       {faucet.deployer}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-2 mt-4">
//                 {!isDeployer && (
//                   <button
//                     onClick={() => handleClaim(faucet.contract)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition-colors"
//                   >
//                     Claim Tokens
//                   </button>
//                 )}
//                 {isDeployer && (
//                   <>
//                     <button
//                       onClick={() => handleGetTokenInfo(faucet.contract)}
//                       className="px-4 py-2 bg-orange-600 text-white rounded-md"
//                     >
//                       Get Token Info
//                     </button>
//                     <button
//                       onClick={() => handleGetBalance(faucet.contract)}
//                       className="px-4 py-2 bg-green-600 text-white rounded-md"
//                     >
//                       Get Balance
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Faucets;






import React, { useEffect, useState } from "react";
import { useFaucet } from "../context/ContractFactory";
import { useAppKitAccount } from "@reown/appkit/react";

const Faucets = () => {
  const { address } = useAppKitAccount();
  const {
    faucets,
    userFaucets,
    totalContracts,
    getTokenInfo,
    claimFaucet,
    getBalanceFromDeployedContract,
  } = useFaucet();

  const [tokenInfos, setTokenInfos] = useState({});
  const [balances, setBalances] = useState({});

  useEffect(() => {
    faucets.forEach(async (faucet) => {
      await handleGetTokenInfo(faucet.contract);
    });
  }, [faucets, userFaucets, totalContracts, address]);

  const handleClaim = async (contractAddress) => {
    await claimFaucet(contractAddress);
  };

  const handleGetTokenInfo = async (contractAddress) => {
    const info = await getTokenInfo(contractAddress);
    setTokenInfos((prevInfos) => ({
      ...prevInfos,
      [contractAddress]: info,
    }));
  };

  const handleGetBalance = async (contractAddress) => {
    try {
      const balance = await getBalanceFromDeployedContract(contractAddress);
      setBalances((prevBalances) => ({
        ...prevBalances,
        [contractAddress]: balance.toString(),
      }));
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 rounded-xl text-white py-10 px-6">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Faucet Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {faucets.map((faucet, index) => {
          const isDeployer =
            address?.toLowerCase() === faucet.deployer.toLowerCase();
          const tokenInfo = tokenInfos[faucet.contract];

          return (
            <div
              key={index}
              className="bg-gray-800 shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-semibold text-white">
                    {tokenInfo?.name || `Faucet ${index + 1}`}
                  </h2>
                  <button
                    onClick={() =>
                      isDeployer
                        ? handleGetBalance(faucet.contract)
                        : handleClaim(faucet.contract)
                    }
                    className="w-16 h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-colors"
                    aria-label={isDeployer ? "Get Balance" : "Claim Tokens"}
                  >
                    {isDeployer ? "💰" : "🪙"}
                  </button>
                </div>
                <p className="text-sm text-gray-400 mb-2">
                  {tokenInfo?.symbol || "Loading..."}
                </p>
                {balances[faucet.contract] && (
                  <p className="text-sm text-gray-400 mt-1">
                    <span className="font-semibold">Balance:</span>{" "}
                    {balances[faucet.contract]}
                  </p>
                )}
                <div className="text-xs text-gray-400 mb-2">
                  <p className="mb-1">
                    <span className="font-semibold">Contract:</span>{" "}
                    {faucet.contract}
                  </p>
                  {isDeployer && (
                    <p>
                      <span className="font-semibold">Deployer:</span>{" "}
                      {faucet.deployer}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                {!isDeployer && (
                  <button
                    onClick={() => handleClaim(faucet.contract)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 focus:ring focus:ring-blue-300 transition-transform"
                  >
                    Claim Tokens
                  </button>
                )}
                {isDeployer && (
                  <>
                    <button
                      onClick={() => handleGetTokenInfo(faucet.contract)}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 focus:ring focus:ring-orange-300 transition-transform"
                    >
                      Get Token Info
                    </button>
                    <button
                      onClick={() => handleGetBalance(faucet.contract)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 focus:ring focus:ring-green-300 transition-transform"
                    >
                      Get Balance
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faucets;

