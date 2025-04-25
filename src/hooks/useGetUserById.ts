import { useEffect, useState } from "react";
type ClerkUser = {
        backupCodeEnabled: boolean;
        banned: boolean;
        createOrganizationEnabled: boolean;
        createdAt: number;
        emailAddresses: { id: string; emailAddress: string }[];
        externalAccounts: object[]; // You can be more specific if needed
        externalId: string | null;
        firstName: string | null;
        hasImage: boolean;
        id: string;
        imageUrl: string;
        lastName: string | null;
        lastSignInAt: number;
        passwordEnabled: boolean;
        phoneNumbers: string[]; // Or more complex objects if needed
        primaryEmailAddressId: string;
        primaryPhoneNumberId: string | null;
        primaryWeb3WalletId: string | null;
        privateMetadata: {item:string};
        publicMetadata: { role: string };
        totpEnabled: boolean;
        twoFactorEnabled: boolean;
        unsafeMetadata: {};
        updatedAt: number;
        username: string;
        web3Wallets: string[];
      };
      
const useGetUserById = (userId: string | "") => {
  const [user, setUser] = useState<ClerkUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

export default useGetUserById;
