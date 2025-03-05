import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useGlobalState } from '@/context/globalStateContext';

const withBookingConfirmation = (WrappedComponent: React.ComponentType) => {

    return (props: any) => {
        const { hourBooked, dateBooked, contactInfo, hasEquipment, lessonType } = useGlobalState();
        const pathName = usePathname();
        const router = useRouter();

        useEffect(() => {
            if (pathName === '/thank-you') {
                if (!dateBooked || !hourBooked || !contactInfo || hasEquipment === null || !lessonType) {
                    router.push('/book');
                }
            }
        }, [dateBooked, hourBooked, contactInfo, hasEquipment, lessonType, pathName, router]);

        if (!dateBooked || !hourBooked || !contactInfo || hasEquipment === null || !lessonType) {
            return null; // Render nothing while redirecting
        }

        return <WrappedComponent {...props} />;
    };
};

export default withBookingConfirmation;