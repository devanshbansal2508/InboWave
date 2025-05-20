// src/shared/hooks/useGetMembership.ts

"use client";

import { getMemberShip } from "@/actions/get.membership";
import { useEffect, useState } from "react";

const useGetMembership = () => {
  const [data, setData] = useState<any>(null); // changed from [] to null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGetMembership = async () => {
      try {
        const res = await getMemberShip();
        console.log("Fetched membership data:", res); // debug
        setData(res);
      } catch (error) {
        console.error("Failed to fetch membership:", error);
      } finally {
        setLoading(false);
      }
    };

    handleGetMembership();
  }, []);

  return { data, loading };
};

export default useGetMembership;
