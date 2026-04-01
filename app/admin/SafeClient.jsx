'use client'; // ★★★ 必須: これをファイルの先頭に追加し、クライアントコンポーネントであることを宣言します ★★★

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Zap, Shield, Wallet, Link } from 'lucide-react';

// ======================================================================
// 1. MOCK DATA & INTERNAL DEPENDENCIES (外部ライブラリをモック化)
//    ※ このブロック全体は、外部パッケージのインポートエラー回避のための代替コードです。
// ======================================================================

// Mock Contract Constants (Replacing "@/lib/contracts")
const SOLUNA_CONTRACT_ADDRESS = "0x5b3231F2531aC21D9bC48E2854bA224f1137c35F";
const SOLUNA_ABI = [
  { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }
];

// Mock Ethers Library (Replacing "ethers")
class MockEthersWallet {
  constructor(provider) {
    this.address = "0xUserSignerAddressMock1234567890ABCDEF";
    this.provider = provider;
    this.name = 'MockSigner';
  }
  getAddress = async () => this.address;
}

class MockEthersAdapter {
  constructor(signer) {
    console.log("MockEthersAdapter initialized with signer:", signer.name);
  }
}

// Mock Safe Protocol Kit (Replacing "@safe-global/protocol-kit")
class MockSafe {
  constructor(config) {
    console.log("Mock Safe instance created for address:", config.safeAddress);
    this.safeAddress = config.safeAddress;
  }

  getAddress = async () => this.safeAddress;

  // Mock function to create a transaction
  createTransaction = async (safeTransactionData) => {
    console.log("Mock: Creating Safe transaction with data:", safeTransactionData);
    return {
      safeTxData: safeTransactionData,
      encoded: '0xmockSafeTxData'
    };
  };

  // Mock function to execute a transaction
  executeTransaction = async (safeTx) => {
    console.log("Mock: Executing Safe transaction:", safeTx);
    return {
      hash: `0xmockTxHash_${Date.now()}`,
      status: 'SUCCESS'
    };
  };
}

// ======================================================================
// 2. MAIN APPLICATION COMPONENT (このコンポーネントを page.tsx から呼び出します)
// ======================================================================

const SafeClient = () => { // コンポーネント名を SafeClient に変更
  const [safeAddress, setSafeAddress] = useState('');
  const [signerAddress, setSignerAddress] = useState('');
  const [status, setStatus] = useState('Idle');
  const [mockSafeInstance, setMockSafeInstance] = useState(null);
  const [recipient, setRecipient] = useState('0xRecipientAddressMock');
  const [amount, setAmount] = useState('100');

  // Hardcode a mock Safe Address for demonstration
  useEffect(() => {
    setSafeAddress('0x40D4A0D8c679a95C240A2612a45dC37b678B3f8C');
  }, []);

  // 1. Initialize Safe and Signer Mocks
  const initializeSafe = useCallback(async () => {
    if (!safeAddress) {
      setStatus('Error: Safe address is required.');
      return;
    }
    setStatus('Initializing mocks...');
    try {
      // 1. Setup the signer (mocking a connected wallet/signer)
      const mockSigner = new MockEthersWallet();
      const mockSignerAddress = await mockSigner.getAddress();
      setSignerAddress(mockSignerAddress);

      // 2. Create the EthersAdapter
      // const ethAdapter = new MockEthersAdapter(mockSigner); 

      // 3. Initialize Safe Protocol Kit instance
      const safe = new MockSafe({ safeAddress });
      setMockSafeInstance(safe);

      setStatus('Ready. Safe and Signer mocks initialized.');
    } catch (error) {
      console.error("Initialization failed:", error);
      setStatus(`Initialization failed: ${error.message}`);
    }
  }, [safeAddress]);

  useEffect(() => {
    initializeSafe();
  }, [initializeSafe]);


  // 2. Mock Transaction Execution
  const executeSafeTransaction = async () => {
    if (!mockSafeInstance) {
      setStatus('Error: Safe not initialized.');
      return;
    }

    setStatus('Creating and proposing transaction...');

    try {
      // Mocking a standard ERC-20 transfer transaction for the Soluna contract
      const encodedTxData = `0xencodedMockTransferDataTo${recipient}Amount${amount}`;

      const safeTransactionData = [{
        to: SOLUNA_CONTRACT_ADDRESS,
        value: '0', // Native token value in Wei
        data: encodedTxData,
        operation: 0, // 0 for CALL
      }];

      // 1. Create the Safe Transaction
      const safeTransaction = await mockSafeInstance.createTransaction(safeTransactionData);

      setStatus('Transaction created. Executing...');

      // 2. Execute the transaction (requires owner signature/confirmation)
      const executionResult = await mockSafeInstance.executeTransaction(safeTransaction);

      setStatus(`Transaction executed successfully! Tx Hash: ${executionResult.hash.slice(0, 10)}...`);

    } catch (error) {
      console.error("Transaction failed:", error);
      setStatus(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-6 sm:p-10 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-indigo-600" />
          Safe Transaction Mock (Client Component)
        </h1>

        <p className={`p-4 rounded-lg text-sm mb-6 font-medium ${status.startsWith('Error') ? 'bg-red-100 text-red-700' : status.startsWith('Ready') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
          <Zap className="w-4 h-4 inline mr-2" />
          Status: {status}
        </p>

        <div className="space-y-4 mb-8 text-sm">
          {/* UI部分の表示ロジック...（変更なし） */}
          <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
            <span className="font-semibold text-gray-700 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-indigo-600" />
              Gnosis Safe Address (Mock)
            </span>
            <code className="text-xs font-mono text-indigo-800 break-all">{safeAddress}</code>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold text-gray-700 flex items-center">
              <Wallet className="w-4 h-4 mr-2 text-gray-500" />
              Signer Address (Mock)
            </span>
            <code className="text-xs font-mono text-gray-600 break-all">{signerAddress || 'Not Connected'}</code>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-semibold text-gray-700 flex items-center">
              <Link className="w-4 h-4 mr-2 text-gray-500" />
              Target Contract (Soluna Mock)
            </span>
            <code className="text-xs font-mono text-gray-600 break-all">{SOLUNA_CONTRACT_ADDRESS.slice(0, 6)}...</code>
          </div>
        </div>

        <div className="space-y-4 p-4 bg-white rounded-lg border">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Transfer Parameters</h2>
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">Recipient Address</label>
            <input
              id="recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="0x..."
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (Mock Units)</label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="e.g., 100"
            />
          </div>
        </div>

        <button
          onClick={executeSafeTransaction}
          disabled={!mockSafeInstance || status.includes('Executing')}
          className="mt-8 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out transform hover:scale-[1.01]"
        >
          {status.includes('Executing') ? (
            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Zap className="w-5 h-5 mr-2" />
          )}
          {status.includes('Executing') ? 'Executing...' : 'Execute Mock Safe Transfer'}
        </button>
      </div>
    </div>
  );
};

export default SafeClient;