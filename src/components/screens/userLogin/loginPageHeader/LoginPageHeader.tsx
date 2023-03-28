import styles from './styles.module.css';


 const LoginPageHeader = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.mainHeading}>Welcome to QnA App!</h1>
            <h2 className={styles.secHeading}>Please fill below details to continue</h2>
        </header>
    )
}

export {LoginPageHeader};