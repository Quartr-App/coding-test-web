import styles from "@/app/styles/LoadingSkeleton.module.css";

export default function LoadingSkeleton() {
    return (
        <div className={styles.loadingSkeleton}>
            <div className={styles.loadingSkeletonCompany}></div>
            <div className={styles.loadingSkeletonCompany}></div>
            <div className={styles.loadingSkeletonCompany}></div>
            <div className={styles.loadingSkeletonCompany}></div>
            <div className={styles.loadingSkeletonCompany}></div>
        </div>
    );
}
