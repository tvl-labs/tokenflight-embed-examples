import { ref, computed, readonly } from 'vue';
import { BrowserProvider, getAddress } from 'ethers';

/* ── Shared chain data ── */

export const SUPPORTED_CHAINS = [
  { id: 1, name: 'Ethereum' },
  { id: 8453, name: 'Base' },
  { id: 42161, name: 'Arbitrum' },
  { id: 10, name: 'Optimism' },
  { id: 137, name: 'Polygon' },
] as const;

const SUPPORTED_CHAIN_IDS: ReadonlySet<number> = new Set(SUPPORTED_CHAINS.map((c) => c.id));

/* ── Singleton reactive state ── */

const address = ref<string | null>(null);
const chainId = ref<number | null>(null);
const isConnected = ref(false);
const isConnecting = ref(false);
const error = ref<string | null>(null);

let listenersRegistered = false;

/* ── Helpers ── */

function getEthereum() {
  return typeof window !== 'undefined' ? window.ethereum ?? null : null;
}

function isValidAddress(value: unknown): value is string {
  return typeof value === 'string' && /^0x[0-9a-fA-F]{40}$/.test(value);
}

function parseChainHex(raw: unknown): number | null {
  if (typeof raw !== 'string' || !/^0x[0-9a-fA-F]+$/.test(raw)) return null;
  const parsed = parseInt(raw, 16);
  return Number.isNaN(parsed) ? null : parsed;
}

function setConnectedState(addr: string, chain: number): void {
  address.value = addr;
  chainId.value = chain;
  isConnected.value = true;
}

function resetState(): void {
  address.value = null;
  chainId.value = null;
  isConnected.value = false;
  error.value = null;
}

/* ── Provider event handlers ── */

const handleAccountsChanged = (...args: unknown[]) => {
  const raw = args[0];
  if (!Array.isArray(raw) || raw.length === 0) {
    resetState();
    return;
  }
  const first = raw[0];
  if (!isValidAddress(first)) return;
  try {
    address.value = getAddress(first);
    isConnected.value = true;
  } catch {
    resetState();
  }
};

const handleChainChanged = (raw: unknown) => {
  chainId.value = parseChainHex(raw);
};

function registerListeners(eth: NonNullable<Window['ethereum']>): void {
  if (listenersRegistered) return;
  eth.on('accountsChanged', handleAccountsChanged);
  eth.on('chainChanged', handleChainChanged);
  listenersRegistered = true;
}

function removeListeners(eth: NonNullable<Window['ethereum']>): void {
  if (!listenersRegistered) return;
  eth.removeListener('accountsChanged', handleAccountsChanged);
  eth.removeListener('chainChanged', handleChainChanged);
  listenersRegistered = false;
}

/* ── Composable ── */

export function useWallet() {
  const connect = async (): Promise<void> => {
    const eth = getEthereum();
    if (eth === null) {
      error.value = 'No wallet detected. Install MetaMask to get started.';
      return;
    }

    isConnecting.value = true;
    error.value = null;

    try {
      const result = await eth.request({ method: 'eth_requestAccounts' });
      if (!Array.isArray(result) || result.length === 0) {
        error.value = 'No accounts returned from wallet.';
        return;
      }

      const raw = result[0];
      if (!isValidAddress(raw)) {
        error.value = 'Wallet returned an invalid address.';
        return;
      }

      const checksummed = getAddress(raw);
      const provider = new BrowserProvider(eth);
      const network = await provider.getNetwork();

      setConnectedState(checksummed, Number(network.chainId));
      registerListeners(eth);
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Failed to connect wallet.';
    } finally {
      isConnecting.value = false;
    }
  };

  const disconnect = (): void => {
    const eth = getEthereum();
    if (eth !== null) {
      removeListeners(eth);
      eth.request({ method: 'wallet_revokePermissions', params: [{ eth_accounts: {} }] }).catch(() => {});
    }
    resetState();
  };

  const switchChain = async (targetChainId: number): Promise<void> => {
    const eth = getEthereum();
    if (eth === null) return;
    if (!SUPPORTED_CHAIN_IDS.has(targetChainId)) return;

    const hex = `0x${targetChainId.toString(16)}`;
    try {
      await eth.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: hex }] });
    } catch (err: unknown) {
      const code = typeof err === 'object' && err !== null && 'code' in err
        ? (err as Record<string, unknown>).code
        : undefined;
      if (code === 4902) {
        error.value = 'This network has not been added to your wallet.';
      } else {
        error.value = err instanceof Error ? err.message : 'Failed to switch chain.';
      }
    }
  };

  const clearError = (): void => {
    error.value = null;
  };

  const hasEthereum = computed(() => getEthereum() !== null);

  const chainName = computed(() => {
    if (chainId.value === null) return '';
    const chain = SUPPORTED_CHAINS.find((c) => c.id === chainId.value);
    return chain?.name ?? `Chain ${chainId.value}`;
  });

  return {
    address: readonly(address),
    chainId: readonly(chainId),
    isConnected: readonly(isConnected),
    isConnecting: readonly(isConnecting),
    error: readonly(error),
    hasEthereum,
    chainName,
    connect,
    disconnect,
    switchChain,
    clearError,
  };
}
