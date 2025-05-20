"use client";

import { manageSubscription } from "@/actions/manage.subscription";
import useGetMembership from "@/shared/hooks/useGetMembership";
import useSubscribersData from "@/shared/hooks/useSubscribersData";
import { ICONS } from "@/shared/utils/icons";
import { Slider } from "@nextui-org/slider";
import { useRouter } from "next/navigation";

const UserPlan = () => {
  const { data: subscribers, loading: subscribersLoading } = useSubscribersData();
  const { data: membershipData, loading: membershipLoading } = useGetMembership();
  const router = useRouter();

  const plan = membershipData?.plan?.toLowerCase() || "";

  const subscriberLimits: Record<string, number> = {
    grow: 10000,
    scale: 100000,
    launch: 2500,
  };

  const maxSubscribers = subscriberLimits[plan] ?? 0;
  const currentSubscribers = subscribers?.length || 0;

  const handleManage = async () => {
    if (!membershipData?.stripeCustomerId) {
      console.error("❌ Customer ID not found in membership data");
      return;
    }

    try {
      const portalUrl = await manageSubscription({
        customerId: membershipData.stripeCustomerId,
      });

      if (portalUrl) {
        router.push(portalUrl);
      } else {
        console.error("❌ Failed to get portal URL");
      }
    } catch (error) {
      console.error("❌ Error in manageSubscription:", error);
    }
  };

  return (
    <div className="w-full my-3 p-3 bg-[#FDF1F8] rounded hover:shadow-xl cursor-pointer">
      <div className="w-full flex items-center">
        <h5 className="text-lg font-medium capitalize">
          {plan || "Unknown"} Plan
        </h5>
        <div
          className="w-[95px] shadow ml-2 cursor-pointer h-[32px] flex justify-center items-center space-x-1 rounded-lg bg-[#E77CAE]"
          onClick={handleManage}
        >
          <span className="text-white text-xl">{ICONS.electric}</span>
          <span className="text-white text-sm">Upgrade</span>
        </div>
      </div>

      <h5 className="text-[#831743] mt-2">Total subscribers</h5>

      <Slider
        aria-label="Subscriber usage"
        hideThumb
        value={currentSubscribers}
        minValue={0}
        maxValue={maxSubscribers}
        className="max-w-md mt-2"
        color="secondary"
      />

      <h6 className="text-[#831743] mt-1">
        {subscribersLoading ? "..." : currentSubscribers} of {maxSubscribers.toLocaleString()} added
      </h6>
    </div>
  );
};

export default UserPlan;
