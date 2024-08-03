import Link from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes } from "react";
import styles from "./styles.module.css";

function isCurrent(flag: boolean): AnchorHTMLAttributes<HTMLAnchorElement> {
  if (!flag) return {};
  return { "aria-current": "page" };
}

type Props = { onCloseMenu: () => void };

export const Nav = ({ onCloseMenu }: Props) => {
  const { pathname } = useRouter();
  return (
    // "내비게이션"을 "메뉴"로 변경하고 테스트 러너를 실행(코드 8-31)
    <nav aria-label="내비게이션" className={styles.nav}>
      <button
        aria-label="메뉴 닫기"
        className={styles.closeMenu}
        onClick={onCloseMenu}
      ></button>
      <ul className={styles.list}>
        <li>
          <Link href={`/my/posts`} legacyBehavior>
            {/**
             * aria-current 라는 속성을 사용해서 스타일을 적용 => 이 마크업을 출력하기 위해 isCurrent 함수 사용
             */}
            <a
              {...isCurrent(
                pathname.startsWith("/my/posts") &&
                  pathname !== "/my/posts/create"
              )}
            >
              My Posts
            </a>
          </Link>
        </li>
        <li>
          <Link href={`/my/posts/create`} legacyBehavior>
            <a {...isCurrent(pathname === "/my/posts/create")}>Create Post</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
