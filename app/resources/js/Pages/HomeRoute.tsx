import { useAuth } from '@/hooks/useAuth';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PublicLayout from '@/Layouts/PublicLayout';
import HomeAuthenticated from './HomeAuthenticated';
import HomeWrapper from './HomeWrapper';

export default function HomeRoute() {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return (
            <AuthenticatedLayout>
                <HomeAuthenticated />
            </AuthenticatedLayout>
        );
    }
    return (
        <PublicLayout>
            <HomeWrapper />
        </PublicLayout>
    );
}
