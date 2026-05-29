'use client';

import posthog from 'posthog-js';

interface RegisterCTALinkProps {
  className?: string;
}

export default function RegisterCTALink({ className }: RegisterCTALinkProps) {
  function handleClick() {
    posthog.capture('registration_cta_clicked');
  }

  return (
    <a href="#pamelding" onClick={handleClick} className={className}>
      Meld deg på
    </a>
  );
}
