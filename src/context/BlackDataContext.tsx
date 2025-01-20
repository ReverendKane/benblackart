"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";

type BlackData = any; // Replace 'any' with a more specific type if you know the structure

interface BlackDataContextType {
    data: BlackData | null;
    isLoading: boolean;
    error: Error | null;
}

const BlackDataContext = createContext<BlackDataContextType | undefined>(
    undefined,
);

export function BlackDataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<BlackData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (data !== null) return; // Don't fetch if we already have data
        try {
            const response = await fetch("/art_data.json");
            const jsonData = await response.json();
            setData(jsonData);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("An error occurred"));
        } finally {
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <BlackDataContext.Provider value={{ data, isLoading, error }}>
            {children}
        </BlackDataContext.Provider>
    );
}

export function useBlackData() {
    const context = useContext(BlackDataContext);
    if (context === undefined) {
        throw new Error("useBlackData must be used within a BlackDataProvider");
    }
    return context;
}
