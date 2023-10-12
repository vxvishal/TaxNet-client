import React from 'react';
import Lottie from 'react-lottie-player';
import Error404 from '../../assests/Error404.json';
import styles from './Error.module.css';

function Error() {
    return (
        <div className={styles.main}>
            <Lottie
                className={styles.lottie}
                play
                animationData={Error404}
            />
        </div>
    )
}

export default Error