import { useAuth } from '../../composables/useAuth'

export const auth = async (to, from, next) => {
    const { isAuthenticated, getUserInfo } = useAuth()

    if (!isAuthenticated()) {
        return next({ name: 'Login' })
    }

    try {
        await getUserInfo()
        next()
    } catch (error) {
        next({ name: 'Login' })
    }
}

export const admin = async (to, from, next) => {
    const { isAuthenticated, isAdmin, getUserInfo } = useAuth()

    if (!isAuthenticated()) {
        return next({ name: 'Login' })
    }

    try {
        await getUserInfo()
        if (!isAdmin()) {
            return next({ name: 'Dashboard' })
        }
        next()
    } catch (error) {
        next({ name: 'Login' })
    }
} 