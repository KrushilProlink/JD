import { FC, ReactNode } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { checkIsActive, KTIcon, WithChildren } from "../../../helpers";

type Props = {
  to: string;
  title: string;
  icon?: ReactNode;
  fontIcon?: string;
  hasBullet?: boolean;
};

const AsideMenuItem: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
}) => {
  const { pathname } = useLocation();
  const isActive = checkIsActive(pathname, to);

  return (
    <div className="menu-item">
      <Link
        className={clsx("menu-link without-sub", { active: isActive })}
        to={to}
      >
        {hasBullet && (
          <span className="menu-bullet">
            <span className="bullet bullet-dot"></span>
          </span>
        )}
        {icon && (
          <span className="menu-icon">
            {/* <KTIcon iconName={icon} className="fs-2" /> */}
            <span className="fs-2" style={{ marginTop: "-4px" }}>
              {icon}
            </span>
          </span>
        )}
        {fontIcon && <i className={clsx("bi fs-3", fontIcon)}></i>}
        <span className="menu-title">{title}</span>
      </Link>
      {children}
    </div>
  );
};

export { AsideMenuItem };
