import React from "react";

export function ToggleState({
  isActive,
  render,
}: {
  isActive?: boolean;
  render: ({
    isOpen,
    close,
    open,
  }: {
    isOpen: boolean;
    close: () => void;
    open: () => void;
  }) => React.ReactNode;
}): any {
  const [isOpen, setIsOpen] = React.useState(isActive || false);
  return render({
    isOpen,
    close: () => {
      setIsOpen(false);
    },
    open: () => {
      setIsOpen(true);
    },
  });
}
