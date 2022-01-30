import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Referral() {
  const router = useRouter();
  const { referral } = router.query;

  useEffect(() => {
    if (referral) {
      if (referral === "settings") {
        router.push("/users/settings");
      }
      if (referral.length === 8) {
        router.push(`/welcome?referral=${referral}`);
      } else {
        router.push("/");
      }
    }
  }, [referral, router]);
  return <div></div>;
}

export default Referral;
