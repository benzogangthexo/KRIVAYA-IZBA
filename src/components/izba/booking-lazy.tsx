"use client";

import { MotionConfig } from "motion/react";
import type { ComponentProps } from "react";

import { BookingWizard } from "@/components/booking/booking-wizard";

/** Отложенный чанк брони: мастер записи + MotionConfig (reduced-motion по настройке системы) */
export function BookingWizardLazy(props: ComponentProps<typeof BookingWizard>) {
  return (
    <MotionConfig reducedMotion="user">
      <BookingWizard {...props} />
    </MotionConfig>
  );
}
