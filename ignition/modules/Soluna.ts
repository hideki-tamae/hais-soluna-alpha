import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SolunaModule = buildModule("SolunaModule", (m) => {
  const soluna = m.contract("SolunaToken");

  return { soluna };
});

export default SolunaModule;
