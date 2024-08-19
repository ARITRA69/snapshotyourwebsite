"use client";

import React from "react";
import Lottie, { LottieComponentProps } from "lottie-react";

interface LottieAnimationProps
  extends Omit<LottieComponentProps, "animationData"> {
  animationData: any;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  ...props
}) => {
  return <Lottie animationData={animationData} {...props} />;
};

export default LottieAnimation;
