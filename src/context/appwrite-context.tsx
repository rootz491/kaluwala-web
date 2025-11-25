"use client";

import { client } from "@/lib/appwrite";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppwriteContextType {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

const AppwriteContext = createContext<AppwriteContextType>({
  isConnected: false,
  isLoading: true,
  error: null,
});

export function useAppwrite() {
  return useContext(AppwriteContext);
}

interface AppwriteProviderProps {
  children: ReactNode;
}

export default function AppwriteProvider({ children }: AppwriteProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function pingAppwrite() {
      try {
        // Ping the Appwrite backend to verify connection
        await client.ping();
        setIsConnected(true);
        console.log("✅ Appwrite connection successful!");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to connect to Appwrite";
        setError(errorMessage);
        console.error("❌ Appwrite connection failed:", errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    pingAppwrite();
  }, []);

  return (
    <AppwriteContext.Provider value={{ isConnected, isLoading, error }}>
      {children}
    </AppwriteContext.Provider>
  );
}
