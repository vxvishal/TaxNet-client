import React from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import styles from './PurchaseMonth.module.css';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';

function SalesMonth() {
    const { monthYear } = useParams();
    const [month, year] = monthYear.split('-');
    const location = useLocation();
    const isChildRouteActive = location.pathname !== `/purchase/${monthYear}`;

    return (
        <>
            {!isChildRouteActive && (
                <div className={styles.container}>
                    <h1>{`${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`}</h1>
                    <div className={styles.options}>
                        <Link to={`add`} className={styles.link}>
                            <div className={styles.option}>
                                <AddIcon className={styles.icon} />
                                <span>Enter a purchase</span>
                            </div>
                        </Link>
                        <Link to={`view`} className={styles.link}>
                            <div className={styles.option}>
                                <ListIcon className={styles.icon} />
                                <span>View all purchases</span>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
            <Outlet />
        </>
    );
}

export default SalesMonth;