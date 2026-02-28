import { supabase } from '@/lib/supabase'
import AdminPropertiesClient from './PropertiesClient'

export const dynamic = 'force-dynamic'

export default async function AdminProperties() {
    const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 font-semibold text-sm rounded-sm">
                Failed to load properties: {error.message}
            </div>
        )
    }

    return <AdminPropertiesClient initialProperties={properties || []} />
}
