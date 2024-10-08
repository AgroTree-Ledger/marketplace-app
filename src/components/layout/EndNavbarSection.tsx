import React from "react";
import ThemeToogle from "./ThemeToogle";
import AuthButton from "../auth/AuthButton";
type Props = {
  hideThemeToogle?: boolean;
};
const EndNavbarSection: React.FC<Props> = ({ hideThemeToogle = false }) => {
  return (
    <div className="flex items-center gap-2">
      {!hideThemeToogle ? <ThemeToogle /> : null}
      <AuthButton />
    </div>
  );
};

export default EndNavbarSection;
