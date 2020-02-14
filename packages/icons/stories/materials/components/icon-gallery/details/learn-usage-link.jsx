import styles from "./learn-usage-link.module.css";

import { Link } from "@blocks";

export function LearnUsageLink() {
    return (
        <div className={`flex justify-end ${styles.link}`}>
            <Link href="?path=/docs/materials-icons--page#dimensions" className="f7">Learn more about usage</Link>
        </div>
    );
}
